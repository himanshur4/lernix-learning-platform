import { useContext, useEffect, useRef, useState } from 'react'
import uniqid from 'uniqid'
import Quill from 'quill'
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { PlusIcon, UploadCloud, X } from 'lucide-react';

const AddCourse = () => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);
  const { backendUrl, getToken } = useContext(AppContext)
  const [courseTitle, setCourseTitle] = useState('')
  const [coursePrice, setCoursePrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [image, setImage] = useState(null)
  const [chapters, setChapters] = useState([])
  const [showPopup, setShowPopup] = useState(false)
  const [currentChapterId, setCurrentChapterId] = useState(null)
  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    isPreviewFree: false,
  })

  const handleChapter = (action, chapterId) => {
    if (action === 'add') {
      const title = prompt('Enter Chapter Name:');
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder: chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter])
      }
    }
    else if (action === 'remove') {
      setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId))
    } else if (action === 'toggle') {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId ? { ...chapter, collapsed: !chapter.collapsed } : chapter
        )
      );
    }
  };

  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === 'add') {
      setCurrentChapterId(chapterId)
      setShowPopup(true)
    }
    else if (action === 'remove') {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            chapter.chapterContent.splice(lectureIndex, 1)
          }
          return chapter;
        })
      )
    }
  }

  const addLectures = () => {
    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureOrder: chapter.chapterContent.length > 0 ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1 : 1,
            lectureId: uniqid()
          };
          chapter.chapterContent.push(newLecture);
        }
        return chapter;
      })
    );
    setShowPopup(false);
    setLectureDetails({
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      if (!image) {
        toast.error('Thumbnail Not Selected')
        return;
      }
      const courseData = {
        courseTitle,
        courseDescription: quillRef.current.root.innerHTML,
        coursePrice: Number(coursePrice),
        discount: Number(discount),
        courseContent: chapters,
      }
      const formData = new FormData()
      formData.append('courseData', JSON.stringify(courseData))
      formData.append('image', image)
      const token = await getToken()
      const { data } = await axios.post(backendUrl + '/api/educator/add-course', formData, { headers: { Authorization: `Bearer ${token}` } })
      if (data.success) {
        toast.success(data.message)
        setCourseTitle('')
        setCoursePrice(0)
        setDiscount(0)
        setImage(null)
        setChapters([])
        quillRef.current.root.innerHTML = ""
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow'
      });
    }
  }, []);

  return (
    <div className='min-h-screen overflow-none flex flex-col items-center justify-start p-3 sm:p-5 md:p-8 '>
      <div className="w-full max-w-3xl">
        <h1 className="text-xl md:text-2xl font-bold text-orange-900 mb-3 md:mb-4">Create New Course</h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-3 md:gap-4 w-full text-orange-900 bg-white p-4 md:p-6 rounded-xl border-t-4 border-orange-600 shadow-md'>
          <div className="flex flex-col gap-1 md:gap-2">
            <label className="font-medium text-sm md:text-base">Course Title</label>
            <input
              onChange={e => setCourseTitle(e.target.value)}
              value={courseTitle}
              type="text"
              placeholder='Type course title here'
              className='outline-none py-2 md:py-3 px-3 md:px-4 text-sm md:text-base rounded-lg border border-orange-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all'
              required
            />
          </div>

          <div className="flex flex-col gap-1 md:gap-2">
            <label className="font-medium text-sm md:text-base">Course Description</label>
            <div className="border border-orange-200 rounded overflow-hidden">
              <div ref={editorRef} className="min-h-24 text-sm md:text-base"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6">
            <div className="flex flex-col gap-1 md:gap-2">
              <label className="font-medium text-sm md:text-base">Course Price</label>
              <input
                onChange={e => setCoursePrice(e.target.value)}
                value={coursePrice}
                type="number"
                placeholder='0'
                className='outline-none py-2 md:py-3 px-3 md:px-4 text-sm md:text-base rounded-lg border border-orange-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all'
                required
              />
            </div>

            <div className="flex flex-col gap-1 md:gap-2">
              <label className="font-medium text-sm md:text-base">Discount (%)</label>
              <input
                onChange={e => setDiscount(e.target.value)}
                value={discount}
                type="number"
                placeholder='0'
                min={0}
                max={100}
                className='outline-none py-2 md:py-3 px-3 md:px-4 text-sm md:text-base rounded-lg border border-orange-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all'
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1 md:gap-2">
            <label className="font-medium text-sm md:text-base">Course Thumbnail</label>
            <div className="flex items-center gap-4">
              <label htmlFor="thumbnailImage" className='flex items-center justify-center cursor-pointer hover:bg-orange-50 transition-colors'>
                {!image && (
                  <div className="flex flex-col items-center justify-center text-orange-500 w-20 h-20 md:w-28 md:h-28 border-2 border-dashed border-orange-300 rounded-lg">
                    <UploadCloud className='w-8' />
                    <span className="text-xs md:text-sm">Upload Image</span>
                  </div>
                )}
                {image && (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Thumbnail"
                    className="w-20 h-20 md:w-28 md:h-28 object-cover rounded-lg"
                  />
                )}
                <input
                  type="file"
                  id='thumbnailImage'
                  onChange={e => setImage(e.target.files[0])}
                  accept='image/*'
                  hidden
                />
              </label>

              {image && (
                <button
                  type="button"
                  onClick={() => setImage(null)}
                  className="text-xs md:text-sm text-orange-600 hover:text-orange-800 cursor-pointer"
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          <div className="mt-2 md:mt-4">
            <h3 className="font-semibold text-base md:text-lg mb-2 md:mb-4">Course Content</h3>

            <div className="space-y-2">
              {chapters.map((chapter, chapterIndex) => (
                <div key={chapterIndex} className='bg-white border border-orange-200 rounded-lg shadow-sm'>
                  <div className='flex justify-between items-center p-3 md:p-4 border-b border-orange-100 bg-orange-50'>
                    <div className='flex items-center'>
                      <button
                        type="button"
                        onClick={() => handleChapter('toggle', chapter.chapterId)}
                        className={`mr-2 transition-transform duration-200 ${chapter.collapsed ? 'rotate-180' : ''}`}
                      >

                        <X className='size-4 text-orange-600' />
                      </button>
                      <span className='font-medium text-sm md:text-base text-orange-900 truncate max-w-32 sm:max-w-full'>Chapter {chapterIndex + 1}: {chapter.chapterTitle}</span>
                    </div>

                    <div className="flex items-center gap-2 md:gap-3">
                      <span className="text-xs md:text-sm text-orange-600">{chapter.chapterContent.length} Lectures</span>
                      <button
                        type="button"
                        onClick={() => handleChapter('remove', chapter.chapterId)}
                        className="p-1 hover:bg-orange-100 rounded-full transition-colors"
                      >
                        <X className='size-4 text-orange-600' />
                      </button>
                    </div>
                  </div>

                  {!chapter.collapsed && (
                    <div className='p-3 md:p-4'>
                      {chapter.chapterContent.length > 0 ? (
                        <div className="space-y-2 mb-3 md:mb-4">
                          {chapter.chapterContent.map((lecture, lectureIndex) => (
                            <div key={lectureIndex} className='flex justify-between items-center p-2 md:p-3 bg-orange-50/50 rounded-lg'>
                              <div className="flex items-center gap-2 overflow-hidden">
                                <span className="min-w-5 h-5 md:w-6 md:h-6 flex items-center justify-center bg-orange-200 text-orange-700 rounded-full text-xs font-medium flex-shrink-0">
                                  {lectureIndex + 1}
                                </span>
                                <div className="overflow-hidden">
                                  <span className="font-medium text-xs md:text-sm text-orange-900 block truncate max-w-32 sm:max-w-full">{lecture.lectureTitle}</span>
                                  <div className="flex items-center text-xs text-orange-600 mt-0.5 md:mt-1 gap-1 md:gap-3 flex-wrap">
                                    <span>{lecture.lectureDuration} mins</span>
                                    <span className="hidden xs:inline">•</span>
                                    {lecture.isPreviewFree ?
                                      <a href={lecture.lectureUrl} target='_blank' className='text-black hover:underline text-xs'>Watch Now</a> :
                                      <span className='text-orange-800 text-xs'>Enroll to watch</span>
                                    }
                                  </div>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleLecture('remove', chapter.chapterId, lectureIndex)}
                                className="p-1 hover:bg-orange-100 rounded-full transition-colors flex-shrink-0 ml-1"
                              >
                                <X className='size-4 text-orange-600' />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-3 md:py-4 text-orange-500 text-xs md:text-sm">
                          No lectures added yet
                        </div>
                      )}

                      <button
                        type="button"
                        className='inline-flex items-center gap-1 md:gap-2 bg-orange-100 hover:bg-orange-200 text-orange-700 px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-colors'
                        onClick={() => handleLecture('add', chapter.chapterId)}
                      >
                        <PlusIcon className='size-4 text-orange-600' />
                        Add Lecture
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              className='flex items-center justify-center gap-1 md:gap-2 w-full bg-orange-100 hover:bg-orange-200 text-orange-700 py-2 md:py-3 rounded-lg mt-3 md:mt-4 font-medium text-sm md:text-base cursor-pointer'
              onClick={() => handleChapter('add')}
            >
              <PlusIcon className='size-4' />
              Add Chapter
            </button>
          </div>

          <button
            type="submit"
            className='bg-orange-600 hover:bg-orange-700 text-white font-medium py-2.5 md:py-3 rounded-lg mt-3 md:mt-4 shadow-sm text-sm md:text-base cursor-pointer'
          >
            Create Course
          </button>
        </form>
      </div>


      {showPopup && (
        <div className='fixed inset-0 flex items-center justify-center bg-orange-900/20 backdrop-blur-sm z-50 p-4'>
          <div className='bg-white text-orange-900 p-4 md:p-6 rounded-xl shadow-xl relative w-full max-w-md'>
            <h2 className='text-lg md:text-xl font-bold mb-4 md:mb-6'>Add New Lecture</h2>

            <div className='mb-3 md:mb-4'>
              <label className="block text-xs md:text-sm font-medium mb-1">Lecture Title</label>
              <input
                type="text"
                className='w-full border border-orange-200 rounded-lg py-2 md:py-2.5 px-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100'
                value={lectureDetails.lectureTitle}
                onChange={(e) => setLectureDetails({ ...lectureDetails, lectureTitle: e.target.value })}
                placeholder="Enter lecture title"
              />
            </div>

            <div className='mb-3 md:mb-4'>
              <label className="block text-xs md:text-sm font-medium mb-1">Duration (minutes)</label>
              <input
                type="number"
                className='w-full border border-orange-200 rounded-lg py-2 md:py-2.5 px-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100'
                value={lectureDetails.lectureDuration}
                onChange={(e) => setLectureDetails({ ...lectureDetails, lectureDuration: e.target.value })}
                placeholder="Enter duration in minutes"
              />
            </div>

            <div className='mb-3 md:mb-4'>
              <label className="block text-xs md:text-sm font-medium mb-1">Lecture URL</label>
              <input
                type="text"
                className='w-full border border-orange-200 rounded-lg py-2 md:py-2.5 px-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100'
                value={lectureDetails.lectureUrl}
                onChange={(e) => setLectureDetails({ ...lectureDetails, lectureUrl: e.target.value })}
                placeholder="Enter lecture URL"
              />
            </div>

            <div className='flex items-center gap-2 mb-4 md:mb-6'>
              <input
                type="checkbox"
                id="freePreview"
                className='w-4 h-4 md:w-5 md:h-5 rounded border-orange-300 text-orange-600 focus:ring-orange-500'
                checked={lectureDetails.isPreviewFree}
                onChange={(e) => setLectureDetails({ ...lectureDetails, isPreviewFree: e.target.checked })}
              />
              <label htmlFor="freePreview" className="text-xs md:text-sm font-medium">Make this lecture available as free preview</label>
            </div>

            <div className="flex gap-2 md:gap-3">
              <button
                type='button'
                className='w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 md:py-2.5 px-3 md:px-4 rounded-lg text-sm'
                onClick={addLectures}
              >
                Add Lecture
              </button>

              <button
                type='button'
                className='bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 md:py-2.5 px-3 md:px-4 rounded-lg text-sm'
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowPopup(false);
                toast.success("Course created successfully🎉");
              }}
              className='absolute top-3 right-3 md:top-4 md:right-4 p-1 hover:bg-orange-100 rounded-full transition-colors'
            >
              <X className='size-4 text-orange-600' />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddCourse