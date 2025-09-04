export async function parseExcelData(file: File): Promise<any> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const text = e.target?.result as string
        const lines = text.split("\n")
        const headers = lines[0].split("\t")

        const parsedData: any = { Common: {} }

        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split("\t")
          if (values.length < headers.length) continue

          const cslType = values[0] || "Common"
          const performanceCategory = values[2] || "General"

          if (!parsedData[cslType]) {
            parsedData[cslType] = {}
          }

          if (!parsedData[cslType][performanceCategory]) {
            parsedData[cslType][performanceCategory] = []
          }

          const monthlyData: any = {}
          const months = [
            "Jan'24",
            "Feb'24",
            "Mar'24",
            "Apr'24",
            "May'24",
            "Jun'24",
            "Jul'24",
            "Aug'24",
            "Sep'24",
            "Oct'24",
            "Nov'24",
            "Dec'24",
            "Jan'25",
            "Feb'25",
            "Mar'25",
            "Apr'25",
            "May'25",
            "Jun'25",
            "Jul'25",
          ]

          months.forEach((month, index) => {
            monthlyData[month] = values[8 + index] || "0"
          })

          parsedData[cslType][performanceCategory].push({
            revisedNumber: values[1] || "",
            description: values[3] || "",
            frequency: values[4] || "Monthly",
            expected: values[6] || "0",
            minimum: values[7] || "0",
            monthlyData,
          })
        }

        resolve(parsedData)
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = () => reject(new Error("Failed to read file"))
    reader.readAsText(file)
  })
}
