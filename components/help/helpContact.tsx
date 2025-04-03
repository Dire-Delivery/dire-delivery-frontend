const HelpContact = ({
  icon: Icon,
  title,
  value,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  title: string;
  value: string;
}) => (
  <div className="flex items-center">
    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
      <Icon className="h-5 w-5 text-blue-600" />
    </div>
    <div>
      <h3 className="font-medium text-gray-900">{title}</h3>
      <p className="text-gray-500">{value}</p>
    </div>
  </div>
);

export default HelpContact;
