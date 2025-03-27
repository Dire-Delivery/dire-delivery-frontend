import apiCall from '@/base-api/api';

const BaseURL = process.env.NEXT_PUBLIC_API_URL;

export const dashboardTotalsAPI = async (userid: string) => {
  const fetchOrder = `${BaseURL}/orders/${userid}/all-orders/1`;
  const ordersResponse = await apiCall({ url: fetchOrder });
  const fetchAdmins = `${BaseURL}/users/${userid}/ADMIN/1`;
  const adminsResponse = await apiCall({ url: fetchAdmins });
  const fetchEmployees = `${BaseURL}/users/${userid}/EMPLOYEE/1`;
  const employeesResponse = await apiCall({ url: fetchEmployees });
  const fetchPending = `${BaseURL}/orders/${userid}/filter-order-status/Pending/1`;
  const pendingResponse = await apiCall({ url: fetchPending });
  const fetchDelivered = `${BaseURL}/orders/${userid}/filter-order-status/Delivered/1`;
  const deliveredResponse = await apiCall({ url: fetchDelivered });
  const fetchPickedup = `${BaseURL}/orders/${userid}/filter-order-status/Picked-up/1`;
  const pickedupResponse = await apiCall({ url: fetchPickedup });

  const result = {
    totalAdmins: adminsResponse.totalUsers,
    totalEmployees: employeesResponse.totalUsers,
    totalOrders: ordersResponse.totalOrders,
    totalPending: pendingResponse.totalOrders,
    totalDelivered: deliveredResponse.totalOrders,
    totalPickedup: pickedupResponse.totalOrders,
  };

  return result;
};
