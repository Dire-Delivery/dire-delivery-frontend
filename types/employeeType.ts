export type Employee = {
    id: string;
    name: string;
    email: string;
    phoneNumber: string | null;
    location: string | null;
    imgUrl: string | null;
  }
  
export type EmployeeLoginDetails = {
  email: string;
  password: string;
}

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  image: string | null;
  location: string | null;
  phone: string | null;
}


// {
//   "id": "7f9a52b5-0554-11f0-83cb-0260a62aad58",
//   "name": "Nathnael Atarsdaf",
//   "email": "u64958s78@gmail.com",
//   "role": "EMPLOYEE",
//   "image": null,
//   "location": null,
//   "phone": null
// }