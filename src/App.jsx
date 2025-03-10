import './App.css'
import { useState, useRef } from 'react'
import { IoCheckmark } from "react-icons/io5";

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    queryType: '',
    message: '',
    consent: false,
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const modalRef = useRef()

  const validate = () => {
    let newErrors = {}
    if (!formData.firstName) {
      newErrors.firstName = 'This field is required'}
    if (!formData.lastName) {
      newErrors.lastName = 'This field is required'}
    if (!formData.email) {
      newErrors.email = 'Email is required'} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'}
    if (!formData.queryType) { 
      newErrors.queryType = 'Please select a query type'}
    if (!formData.message) {
      newErrors.message = 'This field is required'}
    if (!formData.consent) {
      newErrors.consent = 'To submit this form, please consent to being contacted'}
    return newErrors
  }

  const handleSubmit = (e) => { 
    e.preventDefault()
    const validationErrors = validate()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return;
    }
   
      setErrors({})
      setSubmitted(true)

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        queryType: '',
        message: '',
        consent: false,
      })
    
  }

  const handleChange = (e) => {
    const { name, value, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'consent' ? checked : value,
    }))
  }

  const handleModalClose = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setSubmitted(false)
    }
  }

  return (
    <div className='bg-[#dff1e7] min-h-screen flex flex-col justify-center items-center' onClick={handleModalClose}>
      {submitted? ( <div className='mt-6 flex items-center justify-center bg-[#2b4246] text-white p-6 rounded-lg shadow-lg' >
        <div ref={modalRef} className='flex flex-col gap-2' onClick={(e) => e.stopPropagation()}>
          <div className='flex items-center gap-2'>
            <div className='border border-white rounded-full p-1'>
          <IoCheckmark />
            </div>
          <h2>Message Sent!</h2>
          </div>
          <p>Thanks for completing the form. We'll be in touch soon!</p>
        </div>
      </div>) : null}

      <div className='bg-white m-10 p-6 rounded-lg shadow-lg flex flex-col gap-4 w-[400px] md:w-[700px] mx-auto'>
        <h2 className='text-3xl font-bold text-[#2b4246]'>Contact Us</h2>
        <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col gap-4'>
          <div className='flex flex-col gap-3 justify-center md:flex-row md:justify-between'>
          <div className='flex flex-col justify-center gap-3 w-full md:w-1/2'>
            <label className='text-[#2b4246]'>First Name <span className='text-[#0c7d69]'>*</span></label>
            <input type='text' name='firstName' value={formData.firstName} onChange={handleChange} className={`px-6 py-2 border ${errors.firstName? 'border-[#d73c3c]' : 'border-[#87a3a6]'}  rounded-[8px] hover:border-[#0c7d69] hover:cursor-pointer`}/>
            {errors.firstName && <p className='text-[#d73c3c] text-sm'>{errors.firstName}</p>}
          </div>

          <div className='flex flex-col justify-center gap-3 w-full md:w-1/2'>
            <label className='text-[#2b4246]'>Last Name <span className='text-[#0c7d69]'>*</span></label>
            <input type='text' name='lastName' value={formData.lastName} onChange={handleChange} className={`px-6 py-2 border ${errors.lastName? 'border-[#d73c3c]' : 'border-[#87a3a6]'} rounded-[8px] hover:border-[#0c7d69] hover:cursor-pointer`}/>
            {errors.lastName && <p className='text-[#d73c3c] text-sm'>{errors.lastName}</
            p>}
          </div>
          </div>

          <div className='flex flex-col justify-center gap-3'>
            <label className='text-[#2b4246]'>Email Address <span className='text-[#0c7d69]'>*</span></label>
            <input type='email' name='email' value={formData.email} onChange={handleChange} className={`px-6 py-2 border ${errors.email? 'border-[#d73c3c]' : 'border-[#87a3a6]'} rounded-[8px] hover:border-[#0c7d69] hover:cursor-pointer`}/>
            {errors.email && <p className='text-[#d73c3c] text-sm'>{errors.email}</p>}
          </div>
          
          <div className='flex flex-col justify-center gap-3 '>
          <label className='text-[#2b4246]'>Query Type <span className='text-[#0c7d69]'>*</span></label>
          <div className='flex flex-col justify-center gap-3 md:flex-row md:justify-between'>  
            <div className='border border-[#87a3a6] rounded-[8px] px-6 py-3 flex gap-4 items-center hover:border-[#0c7d69] hover:cursor-pointer w-full md:w-1/2'> 
            <input type="radio" name='queryType' value="General" onChange={handleChange} />
              <label className='text-[#2b4246]'>General Enquiry</label>
            </div>
            <div className='border border-[#87a3a6] rounded-[8px] px-6 py-3 flex gap-4 items-center hover:border-[#0c7d69] hover:cursor-pointer w-full md:w-1/2'>    
            <input type="radio" name='queryType' value="Support" onChange={handleChange} />
              <label className='text-[#2b4246]'>Support Request</label>
            </div>
          </div>
          {errors.queryType && <p className='text-[#d73c3c] text-sm'>{errors.queryType}</p>}
          </div>

          <div className='flex flex-col justify-center gap-3'>
            <label className='text-[#2b4246]'>Message <span className='text-[#0c7d69]'>*</span></label>
            <textarea name='message' value={formData.message} onChange={handleChange}  cols="30" rows="6" className={`border ${errors.message? 'border-[#d73c3c]' : 'border-[#87a3a6]'} rounded-[8px] resize-none p-2 hover:border-[#0c7d69] hover:cursor-pointer`} ></textarea>
            {errors.message && <p className='text-[#d73c3c] text-sm'>{errors.message}</p>}
          </div>

          <div>
          <div className='flex items-center gap-4 hover:cursor-pointer'>
            <input type="checkbox" name='consent' checked={formData.consent} onChange={handleChange} className='border border-[#87a3a6] hover:border-[#0c7d69]' />
            <p className='text-[#2b4246]' >I consent to being contacted by the team <span className='text-[#0c7d69]'>*</span></p>
          </div>
            {errors.consent && <p className='text-[#d73c3c] text-sm'>{errors.consent}</p>}
            </div>

          <div>
            <button type='submit' className='mt-6 bg-[#0c7d69] text-white py-[10px] rounded-[8px] w-full hover:bg-[#2b4246] hover:cursor-pointer'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App
