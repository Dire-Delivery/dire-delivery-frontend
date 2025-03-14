import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

interface EmployeePageProps {
  employee: {
    id: string;
    name: string;
    position: string;
  };
}

const EmployeePage: React.FC<EmployeePageProps> = ({ employee }) => {
  return (
    <div>
      <h1>Employee Details</h1>
      <p>ID: {employee.id}</p>
      <p>Name: {employee.name}</p>
      <p>Position: {employee.position}</p>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch the list of employee IDs from your data source
  const res = await fetch('https://api.example.com/employees');
  const employees = await res.json();

  const paths = employees.map((employee: { id: string }) => ({
    params: { employeeId: employee.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { employeeId } = context.params!;
  // Fetch employee data based on the employeeId
  const res = await fetch(`https://api.example.com/employees/${employeeId}`);
  const employee = await res.json();

  return {
    props: {
      employee,
    },
  };
};

export default EmployeePage;
