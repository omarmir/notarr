import fs from "fs"
import path from "path"
import { defineEventHandler, readMultipartFormData, createError } from "h3"

export default defineEventHandler(async (event) => {
  try {
    // Read the form data
    const formData = await readMultipartFormData(event)
    if (!formData)
      throw createError({ statusCode: 400, message: "No form data provided" })

    // Extract the file and filename from the form data
    const file = formData.find((field) => field.name === "file")
    const filename = formData.find((field) => field.name === "filename")

    if (!filename || !filename.data) {
      throw createError({ statusCode: 400, message: "Filename not provided" })
    }
    if (!file || !file.data) {
      throw createError({ statusCode: 400, message: "No file uploaded" })
    }

    // Define the folder where the file will be saved
    const uploadFolder = path.join(process.cwd(), "notes") // Save to an "uploads" folder
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder, { recursive: true }) // Create the folder if it doesn't exist
    }

    // Construct the full file path
    const filePath = path.join(uploadFolder, filename.data.toString("utf-8"))

    // Save the file to the specified folder
    fs.writeFileSync(filePath, file.data)

    return { status: 200, message: "File saved successfully", filePath }
  } catch (error) {
    console.error("Error saving file:", error)
    throw createError({ statusCode: 500, message: "Failed to save file" })
  }
})
