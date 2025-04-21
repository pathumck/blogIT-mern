import React, { useState, useEffect } from 'react'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { getEnv } from '@/helpers/getEnv'
import { showToast } from '@/helpers/showToast'
import { useFetch } from '@/hooks/useFetch'

const LikeCount = ({ props }) => {
  const [likeCount, setLikeCount] = useState(0)
  const [hasLiked, setHasLiked] = useState(false)
  const user = useSelector(state => state.user)

  const blogId = props.blogid
  const userId = user.isLoggedIn ? user.user._id : null

  const { data: blogLikeData } = useFetch(
    `${getEnv('VITE_API_BASE_URL')}/blog-like/get-like/${blogId}${userId ? `?userid=${userId}` : ''}`,
    {
      method: 'GET',
      credentials: 'include',
    }
  )

  useEffect(() => {
    if (blogLikeData) {
      setLikeCount(blogLikeData.likecount)
      setHasLiked(blogLikeData.isUserliked)
    }
  }, [blogLikeData])

  const handleLike = async () => {
    try {
      if (!user.isLoggedIn) {
        return showToast('error', 'Please login into your account.')
      }

      const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/blog-like/do-like`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userid: user.user._id, blogid: blogId })
      })

      if (!response.ok) {
        return showToast('error', response.statusText)
      }

      const result = await response.json()
      setLikeCount(result.likecount)
      setHasLiked(prev => !prev)
    } catch (err) {
      showToast('error', err.message)
    }
  }

  return (
    <button
      onClick={handleLike}
      type="button"
      className="flex justify-between items-center gap-1 cursor-pointer"
    >
      {hasLiked ? <FaHeart fill="red" /> : <FaRegHeart />}
      {likeCount}
    </button>
  )
}

export default LikeCount
