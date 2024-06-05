import React from 'react'

const UserProfile = () => {

  return (
    <div style={{
        display: 'flex',
        backgroundColor: 'red',
        height: '90vh',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }}>
        <div style={{
            backgroundColor: 'blue',
            width: '20%',
            height: '20%',
        }}>
        </div>
        <div style={{
            backgroundColor: 'black',
            width: '20%',
            height: '20%',
        }}></div>
    </div>
  )
}

export default UserProfile