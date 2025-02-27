import cities from "@/public/Icons/cities-delivered.svg"
import delivered from "@/public/Icons/delivered-items.svg"
import pending from "@/public/Icons/pending-items.svg"
import admins from "@/public/Icons/total-admins.svg"
import employees2 from "@/public/Icons/total-employees-2.svg"
import employee from "@/public/Icons/total-employees.svg"
import orders from "@/public/Icons/total-orders.svg"
import revenue from "@/public/Icons/total-revenue.svg"

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
