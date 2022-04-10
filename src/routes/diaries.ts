import express from 'express'
import * as diaryService from '../services/diaryServices'
import toNewDiaryEntry from '../tools/utils'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send(diaryService.getEntriesWithoutSensitiveInfo())
})

router.get('/:id', (req, res) => {
  const diary = diaryService.findById(+req.params.id)
  res.send(diary)
})

router.post('/', (req, res) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body)
    const addedDiaryEntry = diaryService.addDiary(newDiaryEntry)
    res.json(addedDiaryEntry)
  } catch (e) {
    if (e instanceof Error) {
      const errorMessage = e.message
      res.status(400).send(errorMessage)
    }
  }
})

export default router
