import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { AppBar, Box, Button, MenuItem, Select, Toolbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { GlobalFilter } from "../Components/GlobalFilter";
import { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import "../CSS/Site.css";

const ASSIGNMENT_COLUMNS = [
  {
    Header: "Home",
    accessor: "homeTeam",
  },
  {
    Header: "Away",
    accessor: "awayTeam",
  },
  {
    Header: "Referee",
    accessor: "referee",
  },
];

export default function AssignReferees() {
  const [referees, setReferees] = useState([]);
  const [matches, setMatches] = useState([]);
  const [match, setMatch] = useState("");
  const [referee, setReferee] = useState("");
  const [surveyData, setSurveyData] = useState([]);
  const [assignmentData, setAssignmentData] = useState([]);
  const [journalistData, setJournalistData] = useState([]);
  const columns = useMemo(() => ASSIGNMENT_COLUMNS, []);
  const tableInstance = useTable(
    {
      columns: columns,
      data: assignmentData,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    canNextPage,
    canPreviousPage,
    previousPage,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance;
  const { globalFilter } = state;

  const getAssignments = () => {
    axios
      .get("api/v1", {
        params: {
          _collection: "ref_assignments",
        },
      })
      .catch((error) => {
        console.error(error);
      })
      .then((res) => {
        if (res) {
          setAssignmentData(res.data.items);
        }
      });
  };
  const getJournalistAnswers = () => {
    axios
      .get("api/v1", {
        params: {
          _collection: "journalistscore",
        },
      })
      .catch((error) => {
        console.error(error);
      })
      .then((res) => {
        if (res) {
          setJournalistData(res.data.items);
        }
      });
  };

  const getWeights = () => {
    let totalMatchesWeight = 0;
    let averageYellowWeight = 0;
    let averageYellowRedWeight = 0;
    let averageRedWeight = 0;
    let averagePenaltyWeight = 0;

    surveyData.forEach((survey) => {
      totalMatchesWeight += survey.totalMatches;
      averageYellowWeight += survey.averageYellow;
      averageYellowRedWeight += survey.averageYellowRed;
      averageRedWeight += survey.averageRed;
      averagePenaltyWeight += survey.averagePenalty;
    });
    return {
      totalMatchesWeight: totalMatchesWeight / surveyData.length,
      averageYellowWeight: averageYellowWeight / surveyData.length,
      averageYellowRedWeight: averageYellowRedWeight / surveyData.length,
      averageRedWeight: averageRedWeight / surveyData.length,
      averagePenaltyWeight: averagePenaltyWeight / surveyData.length,
    };
  };
  const getJournalistScore = (referee) => {
    console.log(journalistData);
    const refereeAnswers = journalistData.filter(
      (item) => item.name === referee.name
    );
    console.log(refereeAnswers);
    if (refereeAnswers.length === 0) {
      return 0;
    }
    let sum = 0;
    refereeAnswers.forEach((item) => {
      let partialsum = 0;
      item.answers.forEach((item) => {
        partialsum = partialsum + item;
      });
      sum = partialsum + sum;
    });
    const score = sum / refereeAnswers.length;

    return score * 5;
  };
  const getRefereeScore = (referee, weights) => {
    return (
      (getJournalistScore(referee) +
        ((referee.totalMatches === "-" ? 0 : referee.totalMatches) *
          weights.totalMatchesWeight +
          (referee.averageYellow === "-" ? 0 : referee.averageYellow) *
            weights.averageYellowWeight +
          (referee.averageYellowRed === "-" ? 0 : referee.averageYellowRed) *
            weights.averageYellowRedWeight +
          (referee.averageRed === "-" ? 0 : referee.averageRed) *
            weights.averageRedWeight +
          (referee.averagePenalty === "-" ? 0 : referee.averagePenalty) *
            weights.averagePenaltyWeight) *
          100) |
      0
    );
  };

  const updateRefereeScores = async () => {
    const weights = getWeights();
    referees.forEach((referee) => {
      referee.score = getRefereeScore(referee, weights);
    });
    for (let i = 0; i < referees.length; i++) {
      await axios
        .put("/api/v1", {
          _collection: "ref_stats",
          _id: referees[i]._id,
          score: referees[i].score,
        })
        .then((res) => {
          if (res && res.status === 200) {
            console.log("Updated referee score of " + referees[i].name);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
    getReferees();
  };

  const getSurveyData = () => {
    axios
      .get("api/v1", {
        params: {
          _collection: "survey",
        },
      })
      .then((res) => {
        if (res && res.status === 200) {
          setSurveyData(res.data.items);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getReferees = () => {
    axios
      .get("api/v1", {
        params: {
          _collection: "ref_stats",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setReferees(
            res.data.items.sort((a, b) => {
              if (a.score && b.score) {
                return b.score - a.score;
              } else {
                return -1;
              }
            })
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getMatches = () => {
    axios
      .get("api/v1", {
        params: {
          _collection: "fixture",
        },
      })
      .then((res) => {
        if (res && res.status === 200) {
          let matches = res.data.items;
          matches = matches
            .map((match) => {
              let assigned = false;
              if (match.assigned) {
                assigned = true;
              }
              return match.matchStatus !== "MS" && !assigned ? match : null;
            })
            .filter((match) => match !== null);
          setMatches(matches);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const assignReferee = () => {
    axios
      .post("api/v1", {
        _collection: "ref_assignments",
        homeTeam: match.homeTeam,
        awayTeam: match.awayTeam,
        referee: referee.name,
      })
      .then((res) => {
        if (res && res.status === 200) {
          console.log(
            "Assigned referee " +
              referee.name +
              " to match " +
              match.homeTeam +
              " vs " +
              match.awayTeam
          );
          getAssignments();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteAssignment = async (event) => {
    await axios
      .delete("api/v1", {
        data: {
          _collection: "ref_assignments",
          _id: event.target.value,
        },
      })
      .then((res) => {
        if (res && res.status === 200) {
          console.log("Deleted: " + event.target.value);
          getAssignments();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getJournalistAnswers();
    getReferees();
    getMatches();
    getSurveyData();
    getAssignments();
  }, []);

  return (
    <div>
      <AppBar position="relative">
        <Toolbar>
          <Typography component="h1" variant="h5">
            Referee Assignment
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          my: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <label>Referee</label>
        <Select value={referee} onChange={(e) => setReferee(e.target.value)}>
          <MenuItem value="">Select a referee</MenuItem>
          {referees.map((referee) => (
            <MenuItem key={referee._id} value={referee}>
              {referee.name} ||| Score: {referee.score ? referee.score : "-"}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box
        sx={{
          my: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <label>Match</label>
        <Select value={match} onChange={(e) => setMatch(e.target.value)}>
          <MenuItem value="">Select a match</MenuItem>
          {matches.map((match) => (
            <MenuItem key={match._id} value={match}>
              {moment.unix(match.matchTime).format("DD/MM/YYYY HH:mm")} -{" "}
              {match.homeTeam} vs {match.awayTeam}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box
        sx={{
          my: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button onClick={assignReferee} variant="contained">
          Assign
        </Button>
      </Box>
      <Box
        sx={{
          my: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button onClick={updateRefereeScores} variant="contained">
          Update Referee Scores
        </Button>
      </Box>
      <div className="RefData">
        <Box
          sx={{
            my: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? "▴"
                            : "▾"
                          : ""}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                    <Button
                      value={row.original._id}
                      onClick={deleteAssignment}
                      variant="contained"
                    >
                      Delete
                    </Button>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div>
            <br></br>
            <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
              Previous
            </Button>
            <Button onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </Button>
          </div>
        </Box>
        <br></br>
        <br></br>
      </div>
    </div>
  );
}
