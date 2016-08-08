<?php
    $func = $_GET['func'];
//    echo $_GET['test'];
    header("Access-Control-Allow-Origin: *");

    function token(){
        $service_url = 'https://api.instagram.com/oauth/access_token';
        $post = [
            'client_id' => $_GET['id'],
            'client_secret' => $_GET['sec'],
            'grant_type' => 'authorization_code',
            'redirect_uri'  => $_GET['uri'],
            'code' => $_GET['code'],
        ];
        
//        echo $service_url;
//        echo $post;
        
        $ch = curl_init($service_url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post);

        // execute!
        $response = curl_exec($ch);
        curl_close($ch);
        echo $response;
    }

    function tags(){
//        $tag_url = 'https://api.instagram.com/v1/tags/' . $_GET['tag'] . '/media/recent?access_token='. $_GET['token'];
        $tag_url = 'https://api.instagram.com/v1/tags/search?q=' . $_GET['tag'] . '&?access_token='. $_GET['token'];
        service($tag_url);
    }
//
//    $_GET['info'] = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=204911331.16c9557.409966077e6d49d3860d8f674aaea359';
//    
//
//
//
    //next example will recieve all messages for specific conversation


    function service($service_url)
    {
//        $service_url = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=204911331.16c9557.409966077e6d49d3860d8f674aaea359';
        $curl = curl_init($service_url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        $curl_response = curl_exec($curl);
        if ($curl_response === false) {
            $info = curl_getinfo($curl);
            curl_close($curl);
            die('error occured during curl exec. Additioanl info: ' . var_export($info));
        }
        curl_close($curl);
        $decoded = json_decode($curl_response);
        if (isset($decoded->response->status) && $decoded->response->status == 'ERROR') {
            die('error occured: ' . $decoded->response->errormessage);
        }
        
        echo json_encode($decoded->data);
    }

    

    switch ($func) {
        case 'token':
            token();
            break;
        case 'tags':
            tags();
            break;
        default:
            echo 'Some error';

    }



//    echo 'response ok!';
    // convert object => json
//$json = json_encode($decoded);

// convert json => object
//$obj = json_decode($json);
    
//    echo json_encode($decoded->data);
//    echo $decoded;
//    var_export($decoded->response);
?>