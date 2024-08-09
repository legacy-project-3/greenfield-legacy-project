'use client'

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
const TableOne = () => {
  const router = useRouter();
  const [users, setUsers] = useState<[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const usersPerPage = 10;

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3000/users/getAllUsers');
      setUsers(response.data.filter((user: any) => user.role !== "admin"));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdateUserStatus = async (id: number, status: string) => {

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to change the status to ${status}?`,
      icon: 'warning',
      showCancelButton: true,
      customClass: {
        confirmButton: 'bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded',
        cancelButton: 'bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
      },
      buttonsStyling: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'Cancel',
      cancelButtonColor: 'red',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.put(`http://127.0.0.1:3000/users/update/${id}`, { status });
        console.log(response.data);

        await Swal.fire({
          title: 'Updated!',
          text: `The user status has been updated to ${status}.`,
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
          },
          buttonsStyling: false
        });
      } catch (error) {
        console.error('Error updating user status:', error);
      }
    }
  };

  const toggleUserStatus = async (user: any) => {
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    setUsers(users.map((u: any) => 
      u.email === user.email 
        ? { ...u, status: newStatus } 
        : u
    ));
    await handleUpdateUserStatus(user.id, newStatus);
    fetchUsers();
  };
  
  const handleDeleteUser = async (id: number) => {
  
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action is irreversible!',
      icon: 'warning',
      showCancelButton: true,
      customClass: {
        confirmButton: 'bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded',
        cancelButton: 'bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
      },
      buttonsStyling: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      cancelButtonColor: 'red',
      reverseButtons: true,

      
    });
  
    if (result.isConfirmed) {
      try {
        const response = await axios.delete(`http://127.0.0.1:3000/users/delete/${id}`);
        fetchUsers();
        console.log("user deleted");
  
        await Swal.fire({
          title: 'Deleted!',
          text: 'The user has been deleted.',
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
            
          },
          buttonsStyling: false
        });
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const nextPage = () => {
    if (indexOfLastUser < users.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        All Users
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              User
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Email
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Role
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Status
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Actions
            </h5>
          </div>
        </div>

        {currentUsers.map((user: any) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              user.id === users.length - 1 ? "" : "border-b border-stroke dark:border-strokedark"
            }`}
            key={user.id}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <Image src="/images/user/user-01.png" alt="User" width={48} height={48} />
              </div>
              <p className="hidden text-black dark:text-white sm:block">
                {user.firstName} {user.lastname}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{user.email}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{user.role}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{user.status}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <div className="flex items-center space-x-3.5">
                {user.role !=="buyer"&&<Link href={{pathname:`/tables/${user.id}`,query:{firstName:user.firstName,lastname:user.lastname}}}>
                  <button className="hover:text-primary" >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                      fill=""
                    />
                    <path
                      d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                      fill=""
                    />
                  </svg>
                </button></Link>}
                <button className="hover:text-primary" onClick={() => handleDeleteUser(user.id)}>
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                      fill=""
                    />
                  </svg>
                </button>
                <button className="hover:text-primary" onClick={() => toggleUserStatus(user)}>
                  {user.status === 'active' ? (
                    <svg
                      className="fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9 0C4.0275 0 0 4.0275 0 9C0 13.9725 4.0275 18 9 18C13.9725 18 18 13.9725 18 9C18 4.0275 13.9725 0 9 0ZM9 16.2C5.0175 16.2 1.8 12.9825 1.8 9C1.8 5.0175 5.0175 1.8 9 1.8C12.9825 1.8 16.2 5.0175 16.2 9C16.2 12.9825 12.9825 16.2 9 16.2Z" />
                      <path d="M12.9975 5.0025L5.0025 12.9975" strokeWidth="2" stroke="currentColor" />
                    </svg>
                  ) : (
                    <svg
                      className="fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9 0C4.0275 0 0 4.0275 0 9C0 13.9725 4.0275 18 9 18C13.9725 18 18 13.9725 18 9C18 4.0275 13.9725 0 9 0ZM9 16.2C5.0175 16.2 1.8 12.9825 1.8 9C1.8 5.0175 5.0175 1.8 9 1.8C12.9825 1.8 16.2 5.0175 16.2 9C16.2 12.9825 12.9825 16.2 9 16.2Z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-4">
        <button 
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button 
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          onClick={nextPage}
          disabled={indexOfLastUser >= users.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableOne;