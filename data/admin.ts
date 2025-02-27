import cities from "@/public/Icons/cities-delivered.png"
import delivered from "@/public/Icons/delivered-items.png"
import pending from "@/public/Icons/pending-items.png"
import admins from "@/public/Icons/total-admins.png"
import employees2 from "@/public/Icons/total-employees-2.png"
import employee from "@/public/Icons/total-employees.png"
import orders from "@/public/Icons/total-orders.png"
import revenue from "@/public/Icons/total-revenue.png"

export const dashboardCards = [
  {
    title: 'Totoal Employees',
    icon: employee,
  },
  {
    title: 'Total Admins',
    icon: admins,
  },
  {
    title: 'Delevered Items',
    icon: delivered,
  },
  {
    title: 'Pending Items',
    icon: pending,
  },
  {
    title: 'Total Orders',
    icon: orders,
  },
  {
    title: 'Total Revenue',
    icon: revenue,
  },
  {
    title: 'Cities Delivered',
    icon: cities,
  },
  {
    title: 'Total Employees',
    icon: employees2,
  }
];
