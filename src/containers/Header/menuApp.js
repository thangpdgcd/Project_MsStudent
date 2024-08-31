export const adminMenu = [
  {
    //Quản lý người dùng
    name: "menu.admin.manager-user",
    menus: [
      {
        name: "menu.admin.crud",
        link: "/system/user-crud",
      },
      {
        name: "menu.admin.crud-redux",
        link: "/system/user-redux",
      },
      {
        name: "menu.admin.manager-doctor",
        link: "/system/manage-doctor",
      },
      // {
      //   name: "menu.admin.manager-admin",
      //   link: "/system/user-admin",
      // },
      {
        name: "menu.doctor.schedule",
        link: "/doctor/manage-schedule",
      }

    ],
  },
  //quản lý phòng khám
  {
    name: "menu.admin.clinic",
    menus: [
      {
        name: "menu.admin.manager-clinic",
        link: "/system/manager-clinic",
      },
    ],
  },
  //quản lý chuyên khoa
  {
    name: "menu.admin.specialty",
    menus: [
      {
        name: "menu.admin.manager-specialty",
        link: "/system/manager-specialty",
      },
    ],
  },
  //quản lý cẩm nang
  {
    name: "menu.admin.handbook",
    menus: [
      {
        name: "menu.admin.manager-handbook",
        link: "/system/manager-handbook",
      },

    ],
  },

];

export const doctorMenu = [
  // quản lí kế hoạch khám bệnh của bác sĩ
  {
    name: "menu.admin.manager-user",
    menus: [
      {
        name: "menu.doctor.manage-schedule",
        menus: [
          {
            name: "menu.doctor.schedule",
            link: "/system/manage-schedule",
          },

        ]
      },
    ]
  }
]
