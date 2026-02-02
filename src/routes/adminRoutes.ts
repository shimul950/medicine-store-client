

export const adminRoutes = [
    {
        title: "Dashboard",
        url: "/admin-dashboard",
    },
    {
        title: "User Management",
        items: [
            {
                title: "Profile",
                url: "/admin-dashboard/profile",

            },
            {
                title:"Create Category",
                url:"/admin-dashboard/createCategory"
            },
            {
                title:"Get All user",
                url:"/admin-dashboard/getAllUser"
            }
        ]
    }
]