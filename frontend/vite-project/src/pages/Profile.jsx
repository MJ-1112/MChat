import React from 'react'
import Homebar from './Homebar'
import {Avatar} from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
function Profile() {
return (
    <div>
            <Homebar/>
            <div className='flex p-5 mt-5 shadow-xl w-200 h-100 ml-30'>

            <h1 className='font-Kanit text-4xl'>Profile</h1>
            <div className='ml-50 mt-10 w-24 h-24' style={{ position: 'relative', width: 96, height: 96 }}>
                <Avatar sx={{ width: '100%', height: '100%' }} />
                <CameraAltIcon
                    sx={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        borderRadius: '50%',
                        bgcolor: 'grey.300',
                        width: 30,
                        height: 30,
                        zIndex: 1,
                        p: 0.5,
                    }}
                />
            </div>
            </div>
    </div>
)
}

export default Profile