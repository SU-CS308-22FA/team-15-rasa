import UsersDAO from "../dao/usersDAO.js";

export default class UsersCtrl {
    static async apiGetUsers(req, res, next) {
        const usersPerPage = req.query.usersPerPage ? parseInt(req.query.usersPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.username) {
            filters.username = req.query.username
        } else if (req.query.email) {
            filters.email = req.query.email
        } else if (req.query.id) {
            filters.id = req.query.id
        }

        const { usersList, totalNumUsers } = await UsersDAO.getUsers({
            filters,
            page,
            usersPerPage,
        })

        let response = {
            users: usersList,
            page: page,
            filters: filters,
            entries_per_page: usersPerPage,
            total_results: totalNumUsers,
        }
        res.json(response)
    }

    static async apiCreateUser(req, res, next) {
        try {
            const username = req.body.username
            const email = req.body.email
            const password = req.body.password
            const UserResponse = await UsersDAO.registerUser(
                username,
                email,
                password,
            )
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiUpdateUser(req, res, next) {
        try {
            const _id = req.body._id
            const username = req.body.username
            const email = req.body.email
            const password = req.body.password
            const UserResponse = await UsersDAO.updateUser(
                _id,
                username,
                email,
                password,
            )
            const {error} = UserResponse;
            if (error) {
                res.status(400).json({ error })
            }

            if (UserResponse.modifiedCount === 0) {
                throw new Error(
                    "unable to update user - user may not be found",
                )
            }

            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiDeleteUser(req, res, next) {
        try {
            const _id = req.body._id
            const UserResponse = await UsersDAO.deleteUser(_id)

            res.json({ status: "success" , response: UserResponse})
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}