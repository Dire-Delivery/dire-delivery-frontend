import { DetailCard, DetailRow } from './detailCard';

type PersonDetailsProps = {
  title: string;
  person: {
    name: string;
    email: string;
    phone: string;
    address?: string;
    location?: string;
  };
  isEmployee?: boolean;
};

export const PersonDetailsCard = ({
  title,
  person,
  isEmployee = false,
}: PersonDetailsProps) => (
  <DetailCard title={title}>
    <DetailRow label="Full Name" value={person.name} />
    <DetailRow label="Email" value={person.email} />
    <DetailRow label="Phone Number" value={person.phone} />
    <DetailRow
      label={isEmployee ? 'Location' : 'Address'}
      value={isEmployee ? person.location || '' : person.address || ''}
    />
  </DetailCard>
);
