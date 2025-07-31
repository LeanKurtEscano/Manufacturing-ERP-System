import {  faCheckCircle, faHourglassHalf, faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";

import { 
    faUserGear, 
    faUsers, 
    faCreditCard, 
    faMoneyCheckDollar, 
    faIdCard,
    faCar,
    faCarOn,
    faChartBar, 
    faFileInvoiceDollar, 
    faSignOutAlt 
} from "@fortawesome/free-solid-svg-icons";

export const menuItems = [
    { icon: faUserGear, text: "Manage Users", url: "/dashboard/manage-users" },
    { icon: faUsers, text: "Manage Borrowers", url: "/dashboard/manage-borrowers" },
    { icon: faIdCard, text: "User Verification", url: "/dashboard/user-verification" },
    { icon: faMoneyCheckDollar, text: "Loan Applications", url: "/dashboard/loan-applications" },
    { icon: faCreditCard, text: "Manage Payments", url: "/dashboard/manage-payments" },
    { icon: faCar, text: "Rental Applications", url: "/dashboard/rental-applications" },
    { icon: faCarOn, text: "Manage Rentals", url: "/dashboard/manage-rentals" },
    { icon: faSignOutAlt, text: "Logout" }
];

