package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

@Controller
public class DownloadController {

//    @RequestMapping("/download")
//    public ResponseEntity<byte[]> export(String fileName, String filePath) throws IOException {
//
//        HttpHeaders headers = new HttpHeaders();
//        File file = new File(filePath);
//
//        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
//        headers.setContentDispositionFormData("attachment", fileName);
//
//        return new ResponseEntity<byte[]>(FileUtils.readFileToByteArray(file),
//                headers, HttpStatus.CREATED);
//    }


    @RequestMapping("/todownload")
    @ResponseBody
    public void download(String url, String name, HttpServletResponse response) {
        HttpURLConnection conn = null;
        try {
            File file = new File(url);
            // 取得文件的后缀名。
            String ext = file.getName().substring(file.getName().lastIndexOf(".") + 1).toLowerCase();
            StringBuffer buffername = new StringBuffer(name);
            String filename = buffername.append(".").append(ext).toString();

            URL path = new URL(url);
            conn = (HttpURLConnection) path.openConnection();
            conn.setRequestMethod("GET");
            conn.setConnectTimeout(5 * 1000);
            InputStream fis = conn.getInputStream();// 通过输入流获取数据

            byte[] buffer = readInputStream(fis);
            if (null != buffer && buffer.length > 0) {
                // 清空response
                response.reset();
                // 设置response的Header
                response.addHeader("Content-Disposition","attachment;filename="+ new String((filename).getBytes("GBK"),"ISO8859_1"));
                response.addHeader("Content-Length", "" + buffer.length);
                OutputStream toClient = response.getOutputStream();
                response.setContentType("application/octet-stream");
                toClient.write(buffer);
                toClient.flush();
                toClient.close();
            }

        } catch (IOException ex) {
            ex.printStackTrace();
        }finally {
            if(conn != null) {
                conn.disconnect();
            }
        }
    }

    /**
     * 从输入流中获取数据
     * @param inStream 输入流
     * @return
     * @throws Exception
     */
    private byte[] readInputStream(InputStream fis) throws IOException {
        ByteArrayOutputStream outStream = new ByteArrayOutputStream();
        byte[] buffer = new byte[1024];
        int len = 0;
        while( (len=fis.read(buffer)) != -1 ){
            outStream.write(buffer, 0, len);
        }
        fis.close();
        return outStream.toByteArray();
    }




}
