import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Input from '../../common/Input';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../features/auth/authSlice';


const Register = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [avatarView, setAvatarView] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png')
    const { loading } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    // const [showPassword, setShowPassword] = useState(false);

    const hadelAvatar = (e) => {
        let file = e.target.files[0]
        if (file) {
            setValue('avatar', file);
            let url = URL.createObjectURL(file)
            setAvatarView(url)
        }
    }
    const handleFormSubmit = (data) => {
        console.log(data)
        let formData = new FormData()
        formData.append('avatar', data.avatar)
        formData.append('name', data.name)
        formData.append('email', data.email)
        formData.append('password', data.password)
        formData.append('phone', data.phone)
        formData.append('role', data.role)
        dispatch(registerUser(formData))
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 py-12 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <div className="">
                    <img style={{ width: '100px', height: '100px' }} className='shadow-md mx-auto rounded-full' src={avatarView} alt="" />
                    {errors.avatar?.message && <p className='text-red-500 text-sm text-center'>{errors.avatar?.message}</p>}
                </div>
                <form onSubmit={handleSubmit(data => handleFormSubmit(data))} className='flex flex-col gap-5'>
                    <div className="w-full text-center mt-5">
                        <label htmlFor="avatar-upload" className=' text-center cursor-pointer text-blue-500 mt-4 hover:text-blue-800 hover:scale-105 transition-all duration-300'>
                            Upload Avatar
                        </label>
                        <Input
                            id={'avatar-upload'}
                            onChange={hadelAvatar}
                            type='file'
                            className='hidden'
                            accept='image/*'
                        />
                        <Input className='' type='hidden'{...register('avatar', { required: { value: true, message: 'Avatar is required' } })} />
                    </div>

                    <Input
                        {
                        ...register(
                            'name',
                            { required: { value: true, message: 'name is required' } },
                        )}
                        error={errors.name?.message}
                        label='Name'
                        type='text'
                        placeholder='Enter your name'
                    />

                    <Input
                        {...register(
                            'email',
                            { required: { value: true, message: 'email is required' }, pattern: { value: /^\S+@\S+\.\S+$/, message: 'enter a valid email address' } }
                        )}
                        error={errors.email?.message}
                        label='Email'
                        type='email'
                        placeholder='Enter your username'
                    />
                    <Input
                        {...register(
                            'phone',
                            {
                                required: { value: true, message: 'phone number is required' },
                                minLength: { value: 4, message: 'phone must have 10 digits' }
                            })
                        }
                        error={errors.phone?.message}
                        label='Phone'
                        type='number'
                        placeholder='phone number'
                    />
                    <Input
                        {...register(
                            'password',
                            {
                                required: { value: true, message: 'password is required' },
                                minLength: { value: 4, message: 'password must have 4 charactor' }
                            })
                        }
                        error={errors.password?.message}
                        label='Password'
                        type='password'
                        placeholder='password'
                    />

                    <label className='relative top-7 font-semibold left-2' htmlFor="">Role</label>
                    <select {...register('role')} className='border py-1'>
                        <option value="" selected disabled>Select Role</option>
                        <option value="user" selected >user</option>
                        <option value="admin" >admin</option>
                    </select>
                    <button
                        type='submit'
                        className='bg-blue-600 text-white px-3 rounded-md py-2 font-bold'
                    >
                        {!loading ? 'Register' : 'Registering.....'}

                    </button>
                </form>
                <div className='text-center my-3'>
                    <span className='text-gray-700'>All ready have a account</span>
                    <div className='cursor-pointer text-blue-500 underline hover:text-blue-700'><Link to='/login'>Login</Link></div>
                </div>
            </div>
        </div>
    );
};

export default Register; 