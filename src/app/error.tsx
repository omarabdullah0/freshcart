'use client'

interface ErrorProps {
  error: Error
}

export default function ErrorComponent({ error }: ErrorProps) {
  return (
    <h2 className="text-red-500 my-5">
      {error.message}
    </h2>
  )
}