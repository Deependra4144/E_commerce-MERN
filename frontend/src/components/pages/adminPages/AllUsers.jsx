import { useEffect, useMemo, useState } from 'react'
import Pagination from 'react-js-pagination'
import Input from '../../common/Input'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { adminUpdateUser, deleteUser, getAllUsers } from '../../../features/productlice/adminProductSlice';



function AllUsers() {
    const {
        allUsers,
        usersLoading,
        usersError,
        deleteUserLoading,
        deleteUserError,
        deleteUserSuccess
    } = useSelector(state => state.admin)
    const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm()
    const dispatch = useDispatch()
    const [searchQuery, setSearchQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize] = useState(10)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        dispatch(getAllUsers())
    }, [refresh, dispatch])

    useEffect(() => {
        reset({
            name: selectedUser?.name || '',
            email: selectedUser?.email || '',
            phone: selectedUser?.phone || '',
            role: selectedUser?.role || ''
        })
    }, [reset, selectedUser])
    const filteredUsers = useMemo(() => {
        const q = searchQuery.trim().toLowerCase()
        if (!q) return allUsers || []
        return allUsers.filter(u =>
            (u.name || '').toLowerCase().includes(q) ||
            (u.email || '').toLowerCase().includes(q) ||
            (u.role || '').toLowerCase().includes(q)
        )
    }, [allUsers, searchQuery])

    const startIndex = (currentPage - 1) * pageSize
    const currentUsers = filteredUsers.slice(startIndex, startIndex + pageSize)

    const openDialog = (user) => {
        setSelectedUser(user)
        setIsDialogOpen(true)
    }

    const closeDialog = () => {
        setSelectedUser(null)
        setIsDialogOpen(false)
    }


    const handleFormSubmit = (data) => {
        // console.log(selectedUser._id, data)
        let id = selectedUser._id
        dispatch(adminUpdateUser({ id, data }))
    }
    const handleDeleteUser = async () => {
        if (!selectedUser) return
        try {
            await dispatch(deleteUser(selectedUser._id)).unwrap()
            if (deleteUserSuccess) {
                setRefresh(prev => !prev)
                closeDialog()
            }
        } catch {
            // Error handling is now managed by Redux state
        }
    }

    const handleNextPage = (page) => {
        setCurrentPage(page)
    }

    return (
        <div className="px-4 py-6">
            <div className="mb-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">All Users</h2>
                        <p className="text-sm text-gray-500">Browse, search, and manage your users.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 ring-1 ring-gray-200">{filteredUsers.length} shown</span>
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 ring-1 ring-gray-200">{allUsers ? allUsers.length : 0} total</span>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="relative w-full sm:w-96">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 4.262 11.934l3.777 3.777a.75.75 0 1 0 1.06-1.06l-3.777-3.777A6.75 6.75 0 0 0 10.5 3.75Zm-5.25 6.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z" clipRule="evenodd" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1) }}
                            placeholder="Search by name, email or role..."
                            className="w-full rounded-md border border-gray-300 bg-white px-10 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => { setSearchQuery(''); setCurrentPage(1) }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-500 hover:bg-gray-100"
                                aria-label="Clear search"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                                    <path fillRule="evenodd" d="M6.72 6.72a.75.75 0 0 1 1.06 0L12 10.94l4.22-4.22a.75.75 0 1 1 1.06 1.06L13.06 12l4.22 4.22a.75.75 0 1 1-1.06 1.06L12 13.06l-4.22 4.22a.75.75 0 1 1-1.06-1.06L10.94 12 6.72 7.78a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm">
                <table className="min-w-full divide-y divide-gray-100">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Avatar</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Name</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Email</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Role</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {usersLoading && (
                            <tr>
                                <td colSpan="5" className="px-4 py-6 text-center text-sm text-gray-500">Loading...</td>
                            </tr>
                        )}
                        {!usersLoading && usersError && (
                            <tr>
                                <td colSpan="5" className="px-4 py-6 text-center text-sm text-red-600">{usersError}</td>
                            </tr>
                        )}
                        {!usersLoading && !usersError && currentUsers.map(user => (
                            <tr key={user._id} className="hover:bg-gray-50">
                                <td className="px-4 py-3">
                                    <img src={user.avatar?.url || user.avatar || '/placeholder-avatar.png'} alt={user.name} className="h-12 w-12 rounded-full object-cover ring-1 ring-gray-200" />
                                </td>
                                <td className="px-4 py-3">
                                    <button onClick={() => openDialog(user)} className="text-left font-medium text-indigo-600 hover:underline">
                                        {user.name}
                                    </button>
                                    <div className="mt-0.5 text-xs text-gray-500">ID: {user._id}</div>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">{user.email}</td>
                                <td className="px-4 py-3 text-sm">
                                    <span className={`${user.role === 'admin' ? 'bg-purple-50 text-purple-700 ring-purple-200' : 'bg-gray-100 text-gray-700 ring-gray-200'} inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ring-1`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <button onClick={() => openDialog(user)} className="inline-flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v8.25A2.25 2.25 0 006.75 20.25h10.5A2.25 2.25 0 0019.5 18V9.75" />
                                        </svg>
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
                <p className="text-sm text-gray-600">Page {currentPage}</p>
                <div className="flex items-center gap-1.5">
                    {filteredUsers.length > pageSize && (
                        <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mt-6 sm:mt-10">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={pageSize}
                                totalItemsCount={filteredUsers.length}
                                onChange={handleNextPage}
                                nextPageText="Next"
                                prevPageText="Prev"
                                itemClass="mx-1 sm:mx-2"
                                linkClass="px-2 sm:px-3 py-1 border text-xs sm:text-sm rounded text-blue-600 border-blue-300 hover:bg-blue-100"
                                activeClass="bg-blue-200 text-gray-600"
                                activeLinkClass="text-green-500 font-bold"
                            />
                        </div>
                    )}
                </div>
            </div>

            {isDialogOpen && selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50" onClick={closeDialog} />
                    <div className="relative z-10 w-full max-w-3xl rounded-lg bg-white shadow-xl">
                        <div className="flex items-start gap-4 p-6">
                            <img src={selectedUser.avatar?.url || selectedUser.avatar || '/placeholder-avatar.png'} alt={selectedUser.name} className="h-28 w-28 rounded-full object-cover" />
                            <form className='flex flex-col w-full' onSubmit={handleSubmit(data => handleFormSubmit(data))}>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between">
                                        <Input
                                            {...register('name')}
                                            className="text-xl font-semibold outline-none border-none"
                                            error={errors.name?.message}
                                        />
                                        <Input
                                            {...register('phone')}
                                            className="border-none outline-none mt-1 font-bold text-sm text-gray-600"
                                            readOnly
                                            error={errors.phone?.message}
                                        />
                                        <button onClick={closeDialog} className="rounded absolute top-2 font-bold right-4 p-1 text-gray-700 hover:bg-gray-100">✕</button>
                                    </div>
                                    <Input
                                        {...register('email')}
                                        className="mt-1 text-sm text-gray-600 outline-none border-none"
                                        error={errors.email?.message}
                                    />

                                    <div className="mt-4 align-items-center grid grid-cols-2 gap-4 text-sm text-gray-700">
                                        <div className='flex gap-x-1 items-center'>
                                            <span className="font-medium">Role:</span>
                                            <Input
                                                {...register('role')}
                                                className="p-0 outline-none border-none"
                                                error={errors.role?.message}
                                            />

                                        </div>
                                        <div className='flex align-items-center gap-x-1 items-center'>
                                            <span className="font-medium">User ID: </span>{selectedUser._id}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-end gap-3 border-t mt-6 px-6 py-2">
                                    {isDirty && <button type='submit' className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50">Update User</button>}
                                    <button
                                        className="rounded bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                        onClick={handleDeleteUser}
                                        disabled={deleteUserLoading}
                                    >
                                        {deleteUserLoading ? 'Deleting...' : 'Delete User'}
                                    </button>
                                </div>
                                {deleteUserError && (
                                    <div className="mt-2 text-sm text-red-600 text-center">
                                        {deleteUserError}
                                    </div>
                                )}
                                {deleteUserSuccess && (
                                    <div className="mt-2 text-sm text-green-600 text-center">
                                        User deleted successfully!
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AllUsers
