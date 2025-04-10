import apiCall from '@/base-api/api';

const BaseUrl = process.env.NEXT_PUBLIC_API_URL;

export const FetchUsers = async (
  ownerId: string,
  pageNumber: number,
  view: string
) => {
  const fetchURl = `${BaseUrl}/users/${ownerId}/${view}/${pageNumber}`;
  const response = await apiCall({ url: fetchURl });
  return response;
};

export const PromoteEmployee = async (ownerId: string, employeeId: string) => {
  const fetchURl = `${BaseUrl}/users/${ownerId}/change-role`;
  const response = await apiCall({
    url: fetchURl,
    method: 'POST',
    data: { userId: employeeId, role: 'ADMIN' },
  });
  return response;
};

export const ChangeRole = async (
  ownerId: string,
  employeeId: string,
  view: 'employee' | 'admin'
) => {
  const fetchURl = `${BaseUrl}/users/${ownerId}/change-role`;
  const response = await apiCall({
    url: fetchURl,
    method: 'POST',
    data: {
      userId: employeeId,
      role: view == 'employee' ? 'ADMIN' : 'EMPLOYEE',
    },
  });
  return response;
};

export const DemoteEmployee = async (ownerId: string, employeeId: string) => {
  const fetchURl = `${BaseUrl}/users/${ownerId}/change-role`;
  const response = await apiCall({
    url: fetchURl,
    method: 'POST',
    data: { userId: employeeId, role: 'EMPLOYEE' },
  });
  return response;
};

export const DeletePerson = async (ownerId: string, personId: string) => {
  const fetchURl = `${BaseUrl}/users/${ownerId}/delete-user/${personId}`;
  const response = await apiCall({ url: fetchURl, method: 'Delete' });
  return response;
};

export const FindPerson = async (ownerId: string, personId: string) => {
  const fetchURl = `${BaseUrl}/users/${ownerId}/find-one/${personId}`;
  const response = await apiCall({ url: fetchURl });
  return response;
};

export const FindOrdersByPerson = async (
  ownerId: string,
  personId: string,
  pageNumber: number
) => {
  const fetchURl = `${BaseUrl}/orders/${ownerId}/${personId}/orders-blame/${pageNumber}`;
  const response = await apiCall({ url: fetchURl });
  return response;
};

export const SearchByName = async (
  ownerId: string,
  name: string,
  pageNumber: number
) => {
  const fetchURl = `${BaseUrl}/users/${ownerId}/search-by-name/${name}/${pageNumber}`;
  const response = await apiCall({ url: fetchURl });
  return response;
};
