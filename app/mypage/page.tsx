'use client';

import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import axios from 'axios';

interface IFormData {
  password: string;
  password1: string;
  username: string;
}

export default function MyPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IFormData>();

  useEffect(() => {
    async function getUser() {
      const res = await axios.get('http://localhost:3000/api/users/me', {
        withCredentials: true,
      });
    }
    getUser();
  }, []);

  //next 에서의 react-router-dom의 기능
  const router = useRouter();

  const onValid = async (data: IFormData) => {
    //비밀번호, 비밀번호 확인이 같은지 체크
    if (data.password !== data.password1) {
      setError(
        'password1',
        { message: 'Password are not the same' },
        { shouldFocus: true },
      );
    }
    const {
      data: { res },
    } = await axios.patch('http://localhost:3000/api/users/me', data, {
      withCredentials: true,
    });
    console.log(res);
    alert('수정완료');
    router.push('/');
  };

  console.log(errors);

  return (
    <div className="px-14 py-10 w-10/12 mx-auto my-16 border-solid border border-gray-800/10 rounded-2xl shadow-2xl ">
      <form onSubmit={handleSubmit(onValid)}>
        <div className="mb-4">
          <label className="block font-bold mb-2">이메일</label>
          <span className="font-bold">imsif@naver.com</span>
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-2">비밀번호</label>
          <input
            {...register('password', {
              required: 'Password is required!',
              minLength: {
                value: 8,
                message: 'Password is Toooooo short!!!!!',
              },
              maxLength: {
                value: 20,
                message: 'Password is Toooooo long!!!!!',
              },
            })}
            type="password"
            className="input input-bordered "
          />
        </div>
        <span className=" text-sm text-red-600 dark:text-red-500">
          {errors.password?.message}
        </span>

        <div className="mb-4">
          <label className="block font-bold mb-2">비밀번호 확인</label>
          <input
            {...register('password1', {
              required: 'Password1 is required!',
              minLength: {
                value: 8,
                message: 'Password is Toooooo short!!!!!',
              },
              maxLength: {
                value: 20,
                message: 'Password is Toooooo long!!!!!',
              },
            })}
            type="password"
            className="input input-bordered "
          />
        </div>
        <span className=" text-sm text-red-600 dark:text-red-500">
          {errors.password1?.message}
        </span>
        <div className="mb-4">
          <label className="block font-bold mb-2">이름</label>
          <input
            {...register('username', {
              required: 'Username is required!',
              maxLength: {
                value: 6,
                message: '너무 길어요',
              },
            })}
            type="text"
            className="input input-bordered "
          />
        </div>
        <span className=" text-sm text-red-600 dark:text-red-500">
          {errors.username?.message}
        </span>

        {/* <div className="mb-4">
          <label className="block font-bold mb-2">생년월일</label>
          <input type="date" className="input input-bordered " />
        </div> */}

        <button type="submit" className="mt-4 block btn btn-primary">
          저장
        </button>
      </form>

      <div className="divider"></div>
      <div className="mb-4">
        <form>
          <label className="block font-bold mb-2">프로필 이미지</label>
          <input
            type="file"
            className="file-input file-input-bordered file-input-primary w-full max-w-xs mr-4"
          />
          <button type="submit" className="btn btn-primary">
            저장
          </button>
        </form>
      </div>
    </div>
  );
}