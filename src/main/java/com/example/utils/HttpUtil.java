package com.example.utils;

import org.apache.http.Header;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.config.SocketConfig;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.message.BasicHeader;
import org.apache.http.util.EntityUtils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class HttpUtil {


    private static PoolingHttpClientConnectionManager cm;

    static
    {
        cm=new PoolingHttpClientConnectionManager() ;
        cm.setMaxTotal(300);
        cm.setDefaultMaxPerRoute(200);
        //getIpThread.start();
    }
    public static  String dogetHtml(String url) {

        List<Header> headerList = new ArrayList<>();
        String[]  ua = {"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:46.0) Gecko/20100101 Firefox/46.0",
                  "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36 TheWorld 7",
                "Mozilla/5.0 (Windows NT 6.1; W…) Gecko/20100101 Firefox/60.0"};

        //headerList.add(new BasicHeader("Host", "music.163.com"));
        headerList.add(new BasicHeader("Referer", "https://music.163.com/"));

        //headerList.add(new BasicHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; …) Gecko/20100101 Firefox/70.0"));
        headerList.add(new BasicHeader("User-Agent", ua[(int) Math.random() * ua.length]));


        SocketConfig socketConfig = SocketConfig.custom().setSoTimeout(8000).build();

        cm.setDefaultSocketConfig(SocketConfig.custom().setSoTimeout(8000).build());

        CloseableHttpClient httpClient = HttpClients.custom().setConnectionManager(cm)
                .setDefaultSocketConfig(socketConfig)
                .build();

        HttpGet httpGet = new HttpGet(url);
        for (Header header : headerList) {
            httpGet.setHeader(header);
        }
        httpGet.setConfig(getConfig());


        CloseableHttpResponse response = null;
        try {
            response = httpClient.execute(httpGet);

            if(response.getStatusLine().getStatusCode()==200)
            {
                if(response.getEntity()!=null)
                {
                    String content = EntityUtils.toString(response.getEntity(), "utf8");
                    return content;
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            if(response!=null)
            {
                try {
                    EntityUtils.consume(response.getEntity());
                    response.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        return "";
    }

    private static RequestConfig getConfig() {
        RequestConfig config = RequestConfig.custom()
                .setConnectTimeout(5000)
                .setExpectContinueEnabled(true)//重点参数
                .setConnectionRequestTimeout(10000)
                .setStaleConnectionCheckEnabled(true)
                .build();
        return config;
    }
}
