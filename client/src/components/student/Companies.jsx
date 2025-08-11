const Companies = () => {
  return (
    <div className=' w-full mb-0'>
      <div className='pt-16'>
        <p className='text-base text-gray-700'>Trusted by learners from</p>
        <div className='flex flex-wrap items-center justify-center gap-6 md:gap-16 md:mt-10 mt-5'>
          <img src="/microsoft_logo.svg" alt="Microsoft" className='w-20 md:w-28' />
          <img src='/walmart_logo.svg' alt="Walmart" className='w-20 md:w-28' />
          <img src='/accenture_logo.svg' alt="Accenture" className='w-20 md:w-28' />
          <img src='/adobe_logo.svg' alt="Adobe" className='w-20 md:w-28' />
          <img src='/paypal_logo.svg' alt="Paypal" className='w-20 md:w-28' />
        </div>
      </div>
    </div>
  )
}

export default Companies
