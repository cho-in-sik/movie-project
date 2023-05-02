'use client';

import Image from 'next/image';

import { useQuery } from '@tanstack/react-query';
import { getMyReview } from '@/utils/api/mypage/getMyReview';
import { api } from '@/utils/api/customAxios';
import profileBasicImg from '@/public/basicImg.jpeg';
import { useEffect, useState } from 'react';

interface IReviewData {
  id: number;
  title: string;
  overview: string;
  rating: number;
}

export default function MyMovie() {
  const { data } = useQuery(['myreviews'], getMyReview);

  // 평균 평정 배열
  let averageRating: Array<any> = [0];
  const dataRating = data?.map((item: IReviewData) =>
    averageRating.push(item.rating),
  );
  const averRating = averageRating.reduce((prev: number, cur: number) => {
    return prev + cur;
  });

  const handleReviewDelete = async (reviewId: number) => {
    await api.delete(`/api/movies/reviews/${reviewId}`);
  };

  return (
    <div className="flex">
      <div className="px-14 py-10 w-10/12 mx-auto my-16 border-solid border border-gray-800/10 rounded-2xl shadow-2xl  ">
        {!data ? (
          <span>no data</span>
        ) : (
          <>
            <div className="font-bold text-2xl mb-8">My Reviews</div>
            <div className="stats shadow mb-10 w-5/6 ml-16">
              <div className="stat  ">
                <div className="stat-figure text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-8 h-8 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    ></path>
                  </svg>
                </div>
                <div className="stat-title">Total Reviews</div>

                <div className="stat-value text-primary">{data?.length}</div>
                <div className="stat-desc">21% more than last month</div>
              </div>

              <div className="stat">
                <div className="stat-figure text-secondary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-8 h-8 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                </div>
                <div className="stat-title">Average Rating</div>

                <div className="stat-value text-secondary">
                  {(averRating / data.length).toFixed(2)}
                </div>
                <div className="stat-desc">21% more than last month</div>
              </div>

              <div className="stat">
                <div className="stat-figure text-secondary">
                  <div className="avatar online">
                    <div className="w-16 rounded-full">
                      {/* {data[0].author.avatarUrl ? (
                        <Image
                          className="h-[600px]"
                          src={profileBasicImg}
                          alt="기본이미지"
                          width={100}
                          height={100}
                        />
                      ) : (
                        <Image
                          className="h-[600px]"
                          src={profileBasicImg}
                          alt="기본이미지"
                          width={100}
                          height={100}
                        />
                      )} */}
                      <Image
                        className="h-[600px]"
                        src={profileBasicImg}
                        alt="기본이미지"
                        width={100}
                        height={100}
                      />
                    </div>
                  </div>
                </div>
                <div className="stat-value pt-5">{data[0].authorId}님</div>

                {/* <div className="stat-title">Tasks done</div>
            <div className="stat-desc text-secondary">31 tasks remaining</div> */}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>제목</th>
                    <th>내용</th>
                    <th>평점</th>
                    <th>리뷰 삭제</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((item: IReviewData, i: number) => (
                    <tr key={item.id}>
                      <th>{i + 1}</th>
                      <th>{item.title}</th>
                      <td className="truncate">{item.overview}</td>
                      <td>{item.rating}</td>
                      <td>
                        <button
                          className="btn bg-red-400 border-none"
                          onClick={() => handleReviewDelete(item.id)}
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
