function Container({ children }) {
  return (
    <div className="flex h-[100%] w-[100%] flex-col items-center justify-start overflow-scroll px-[0.94rem]">
      {children}
    </div>
  )
}

export default Container
