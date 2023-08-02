import fs from "fs";

describe('csv middleware tests', () => {
    it("should return 2", async () => {
        const formData = new FormData();
        const mockFile = fs.readdirSync(__dirname + "/__mockFiles__/")

        console.log(mockFile)

        formData.append("mockfile", mockFile[0])

        const response = await fetch("http://localhost:3000/api/v1/uploadFile", {
            method: "post",
            body: formData,
        })

        const result = await response.json();

        console.log(result);
    })
})