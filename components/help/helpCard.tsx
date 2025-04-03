import { Mail, Phone, MapPin } from 'lucide-react';

import HelpContact from './helpContact';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HelpCard = ({ help, user, setShowEditInfoModal }: any) => (
  <div className="bg-white w-full rounded-lg shadow-sm p-8">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">
      Help and Support
    </h2>
    <div className="h-px bg-gray-200 mb-6"></div>

    <div className="md:w-[480px] space-y-6 flex flex-col p-2 gap-2">
      <HelpContact
        icon={Mail}
        title="Email Support"
        value="Direexpress1@gmail.com"
      />
      <HelpContact
        icon={Phone}
        title="Phone Support"
        value={help?.supportTel || 'N/A'}
      />
      <HelpContact
        icon={MapPin}
        title="Location"
        value="Bole Michael, Addis Ababa, Ethiopia"
      />
    </div>

    {(user?.role === 'OWNER' || user?.role === 'ADMIN') && (
      <div className="mt-8 flex justify-end">
        <Button
          onClick={() => setShowEditInfoModal(true)}
          className="inline-flex items-center px-4 py-2 bg-[#0a0f8a] text-white rounded-md hover:bg-[#0a0f8a]/90 transition-colors"
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit Info
        </Button>
      </div>
    )}
  </div>
);

export default HelpCard;
