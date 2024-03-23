import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '@/config/firebase'

export const upload = async (file) => {
  const storageRef = ref(storage, `Users/OykF86gdN0NQUZTmw85SkF0Yzak1/${file}`)
  const uploadTask = uploadBytesResumable(storageRef, file)

  let progress = 0
  let downloadURL = ''

  await new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log(`Upload is ${progress}% done`)
      },
      (error) => {
        console.log(error)
        reject(error)
      },
      async () => {
        downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
        console.log('File available at', downloadURL)
        resolve()
      }
    )
  })

  return { progress, downloadURL }
}
