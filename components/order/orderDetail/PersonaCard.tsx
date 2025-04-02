import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';
import React from 'react';

interface Person {
  name?: string;
  phone?: string | null;
  address?: string;
  location?: string;
  email?: string;
}

interface PersonaCardProps {
  title: string;
  Icon: typeof User;
  person: Person;
  isEmployee?: boolean;
}

const PersonaCard: React.FC<PersonaCardProps> = ({
  title,
  Icon,
  person,
  isEmployee = false,
}) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-md flex items-center gap-2">
        <Icon className="h-5 w-5" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-medium">Full Name</p>
            <p className="text-sm text-gray-500">{person?.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Phone Number</p>
            <p className="text-sm text-gray-500">{person?.phone}</p>
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-medium">
              {isEmployee ? 'Location' : 'Address'}
            </p>
            <p className="text-sm text-gray-500">
              {isEmployee ? person?.location : person?.address}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Email</p>
            <p className="text-sm text-gray-500">{person?.email}</p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default PersonaCard;
