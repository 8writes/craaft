/** @format */

import React, { useState } from 'react'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined'

const ProductDialogue = () => {
  const [options, setOptions] = useState([{ name: '', values: [''] }])

  const handleOptionChange = (index, valueIndex, newValue) => {
    const updatedOptions = [...options]
    updatedOptions[index].values[valueIndex] = newValue
    setOptions(updatedOptions)
  }

  const handleAddOption = () => {
    setOptions([...options, { name: '', values: [''] }])
  }

  const handleAddValue = (index) => {
    const updatedOptions = [...options]
    updatedOptions[index].values.push('')
    setOptions(updatedOptions)
  }

  const handleRemoveOption = (index) => {
    const updatedOptions = [...options]
    updatedOptions.splice(index, 1)
    setOptions(updatedOptions)
  }

  const handleRemoveValue = (optionIndex, valueIndex) => {
    const updatedOptions = [...options]
    updatedOptions[optionIndex].values.splice(valueIndex, 1)
    setOptions(updatedOptions)
  }

  return (
    <div>
      {options.map((option, index) => (
        <div key={index}>
          <label>
            <p className='font-semibold text-gray-500'>Option Name</p>
            <input
              className='w-full uppercase outline-none border px-1  py-1 my-2 font-semibold'
              type='text'
              placeholder='Size / Color / Storage '
              value={option.name}
              onChange={(e) => {
                const updatedOptions = [...options]
                updatedOptions[index].name = e.target.value
                setOptions(updatedOptions)
              }}
            />
            <button className=' mb-2 text-xs font-semibold text-gray-600'>
              <InfoOutlinedIcon /> One value per input
            </button>
          </label>

          {option.values.map((value, valueIndex) => (
            <>
              <p className='font-semibold text-gray-500'>Option Value</p>
              <div key={valueIndex}>
                <input
                  className='w-full uppercase outline-none border px-1 my-2 py-1 font-semibold'
                  type='text'
                  placeholder='XL / BLUE / 256GB'
                  value={value}
                  onChange={(e) =>
                    handleOptionChange(index, valueIndex, e.target.value)
                  }
                />
                <button
                  type='button'
                  onClick={() => handleRemoveValue(index, valueIndex)}
                  className=' -ml-7 text-gray-600'>
                  <CancelOutlinedIcon />
                </button>
                <button className='mb-2 text-xs font-semibold text-gray-600'>
                  <InfoOutlinedIcon /> One value per input
                </button>
              </div>
            </>
          ))}
          <div className='flex justify-end'>
            <button
              className=' text-sm px-1 text-green-500 uppercase font-semibold  rounded-sm'
              type='button'
              onClick={() => handleAddValue(index)}>
              Add Value
            </button>
          </div>

          <span className='flex gap-2 my-4'>
            <button
              className='border border-red-600 px-1 text-red-500 uppercase font-semibold  rounded-sm'
              type='button'
              onClick={() => handleRemoveOption(index)}>
              Remove Option
            </button>
          </span>
        </div>
      ))}
      <div className='flex justify-between flex-wrap gap-5 md:gap-10 items-center mt-10 mb-7'>
        <button
          className='w-full text-indigo-600 justify-center rounded-sm border border-indigo-500 flex items-center md:gap-2 hover:text-indigo-500'
          type='button'
          onClick={handleAddOption}>
          <AddCircleOutlineOutlinedIcon /> Add New Details
        </button>
        <button
          className='w-full text-green-600 justify-center p-2 rounded-sm border border-green-500 flex items-center md:gap-2 hover:text-green-500'
          type='button'>
          <SaveAltOutlinedIcon /> Save and Continue
        </button>
      </div>
    </div>
  )
}

export default ProductDialogue
