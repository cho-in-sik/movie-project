'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api/customAxios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { getUser } from '@/utils/api/mypage/getUser';
import WidthDrawModal from '../withdrawModal';
import Loading from '@/app/loading';

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
  //next 에서의 react-router-dom의 기능
  const router = useRouter();

  const { data, isLoading, isError } = useQuery(['userInfo'], getUser, {
    onSuccess: () => {
      console.log('성공');
    },
  });
  if (isLoading) {
    return <Loading />;
  }

  //수정
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
    } = await api.patch('/api/users/me', {
      name: data.username,
      password: data.password,
    });

    alert('수정완료');
    router.push('/');
  };

  return (
    <div className="flex">
      <div className="px-14 py-10 w-10/12 mx-auto my-16 border-solid border border-gray-800/10 rounded-2xl shadow-2xl ">
        <form onSubmit={handleSubmit(onValid)}>
          <div className="mb-4">
            <label className="block font-bold mb-2">이메일</label>
            <span>{data?.user?.email}</span>
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
              className="input input-bordered"
              defaultValue={data?.user?.name}
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
        <div className="divider"></div>
        <div>
          <div className="block font-bold mb-2 text-red-500 dark:text-red-500">
            회원탈퇴
          </div>
          {/* 회원탈퇴 모달창 */}
          <WidthDrawModal />
        </div>
      </div>
    </div>
  );
}