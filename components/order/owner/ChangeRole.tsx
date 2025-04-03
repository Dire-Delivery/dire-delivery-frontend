'use client';


import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Person } from '@/types/employeeType';
import { LuX } from 'react-icons/lu';

type ChangeRoleModalRole = {
    selectedPerson: Person | null | undefined,
    setSelectedPerson: React.Dispatch<React.SetStateAction<Person | null | undefined>>,
    setShowChangeRoleModal: React.Dispatch<React.SetStateAction<boolean>>,
    view: "admin" | "employee",
    changeRole: () => void
}

function ChangeRoleModal({selectedPerson, setSelectedPerson, setShowChangeRoleModal, view, changeRole} : ChangeRoleModalRole) {
    return (
        <div className="fixed inset-0 bg-[#060A87] bg-opacity-30 flex items-center justify-center z-50">
            <Card className='relative px-8'>
                <CardHeader>
                    <LuX className='absolute top-4 right-4 cursor-pointer' onClick={() => {
                        setShowChangeRoleModal(false)
                        setSelectedPerson(null)
                    }} />
                    <CardTitle className='text-[#060A87] font-bold text-2xl mx-auto'>Are your sure you want to {view == "employee" ? "Promote" : "Demote"} them?</CardTitle>
                </CardHeader>
                <CardContent className=' '>
                    <div>
                        <div className='text-[#060A87] font-bold text-lg'>
                            Name: <span className='text-[#4A4A4F]'>{selectedPerson?.name}</span>
                        </div>
                        <div className='text-[#060A87] font-bold text-lg'>
                            Email: <span className='text-[#4A4A4F]'>{selectedPerson?.email}</span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className=''>
                    <div className="flex w-full justify-center gap-8 mt-2">
                        <div className="flex justify-end gap-4 mt-2">
                            <div></div>

                            <button
                                type="button"
                                onClick={() => {
                                    setShowChangeRoleModal(false)
                                    setSelectedPerson(null)
                                }}
                                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => changeRole()}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default ChangeRoleModal