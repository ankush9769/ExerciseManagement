import React from 'react'

const EditExercise = () => {
  return (
    <div className='container mt-4'>
            <form onSubmit={handleSubmit}>
                <legend className="mb-3">Add your Exercise</legend>
                <div className="mb-3">
                    <label className="form-label">username</label>
                    <input type="text" className="form-control" placeholder="username" value={username} onChange={onchangeUsername} />
                </div>
                <div className="mb-3">
                    <label className="form-label">description</label>
                    <input type="text" className="form-control" placeholder="description" value={description} onChange={onchangeDescription} />
                </div>
                <div className="mb-3">
                    <label className="form-label">duration</label>
                    <input type="Number" className="form-control" placeholder="duration" value={duration} onChange={onchangeDuration} />
                </div>
                <div className="mb-3">
                    <label className="form-label">date</label>
                    <input type="date" className="form-control" placeholder="date" value={date} onChange={onchangeDate} />
                </div>
                <button type="submit" className="btn btn-primary" >Create Exercise</button>
            </form>
        </div>
  )
}

export default EditExercise
