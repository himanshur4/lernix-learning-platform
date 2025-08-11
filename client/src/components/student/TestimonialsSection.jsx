import { dummyTestimonial } from '../../assets/assets'

const TestimonialsSection = () => {
  return (
   <div className="pb-14 px-10 sm:px-5 md:px-40">
    <h2 className='text-3xl font-medium text-gray-900'>Testimonials</h2>
    <p className='md:text-base text-gray-900 mt-3'>Hear from our learners as they share their journeys of transformation, success, and how our<br/>platform has made a difference in their lives.</p>
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-8 mt-14'>
      {dummyTestimonial.map((testimonial,index)=>(
        <div key={index} className='text-sm text-left pb-4 bg-white overflow-hidden rounded-2xl shadow-md transition-transform duration-300 hover:-translate-y-0.5 hover:drop-shadow-xl border-gray-300 border'>
          <div className='flex items-center gap-4 px-5 py-4 bg-gradient-to-tl from-orange-600 to-orange-800 '>
            <img className='h-12 w-12 rounded-full' src={testimonial.image} alt={testimonial.name} />
            <div>
              <h1 className='text-lg font-medium text-white'>{testimonial.name}</h1>
              <p className='text-gray-100'>{testimonial.role}</p>
            </div>
            
          </div>
          <div className='p-5 pb-7'>
              <div className='flex gap-0.5'>
                {[...Array(5)].map((_,i)=>(
                  <img className='h-5' key={i} src={i<Math.floor(testimonial.rating)?'/rating_star.svg' : '/star_dull_icon.svg'} alt="star" />
                ))}
              </div>
              <p className='text-black mt-5'>{testimonial.feedback}</p>
            </div>
            <a href="#" className='text-blue-600 underline px-5'>Read more</a>
        </div>
      ))}
    </div>
   </div>
  )
}

export default TestimonialsSection
