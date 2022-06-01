<?xml version='1.0' encoding='utf-8'?>

<Server port="8005" shutdown="SHUTDOWN">
  <Listener className="org.apache.catalina.startup.VersionLoggerListener" />
  <Listener className="org.apache.catalina.core.AprLifecycleListener" SSLEngine="on" />
  <Listener className="org.apache.catalina.core.JasperListener" />
  <Listener className="org.apache.catalina.core.JreMemoryLeakPreventionListener" />
  <Listener className="org.apache.catalina.mbeans.GlobalResourcesLifecycleListener" />
  <Listener className="org.apache.catalina.core.ThreadLocalLeakPreventionListener" />

  
  <GlobalNamingResources>
    <Resource name="UserDatabase" auth="Container"
              type="org.apache.catalina.UserDatabase"
              description="User database that can be updated and saved"
              factory="org.apache.catalina.users.MemoryUserDatabaseFactory"
              pathname="conf/tomcat-users.xml" />
  </GlobalNamingResources>

  
  <Service name="Catalina">

    <Connector port="8080" protocol="HTTP/1.1"
               connectionTimeout="20000"
               URIEncoding="UTF-8"
               redirectPort="8443" />
    
    <Connector port="8443" 
    	protocol="HTTP/1.1"
    	SSLEnabled="true"
    	URIEncoding="UTF-8"
    	scheme="https"
    	secure="true"
    	keystoreFile="/usr/local/tomcat/apache-tomcat-7.0.67/cert/7397779__coyotebio-lab.com.pfx"
    	keystoreType="PKCS12"
    	keystorePass="L5AniDIN" 
    	clientAuth="false"
    	SSLProtocol="TLSv1+TLSv1.1+TLSv1.2"
    	ciphers="TLS_RSA_WITH_AES_128_CBC_SHA,TLS_RSA_WITH_AES_256_CBC_SHA,TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA,TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256,TLS_RSA_WITH_AES_128_CBC_SHA256,TLS_RSA_WITH_AES_256_CBC_SHA256"/>

    <!-- Define an AJP 1.3 Connector on port 8009 -->
    <Connector port="8009" protocol="AJP/1.3" redirectPort="8443" />


    <Engine name="Catalina" defaultHost="localhost">

      <Realm className="org.apache.catalina.realm.LockOutRealm">
        <Realm className="org.apache.catalina.realm.UserDatabaseRealm"
               resourceName="UserDatabase"/>
      </Realm>

      <Host name="localhost"  appBase="webapps"
            unpackWARs="true" autoDeploy="true">

        <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
               prefix="localhost_access_log." suffix=".txt"
               pattern="%h %l %u %t &quot;%r&quot; %s %b" />
      </Host>
    </Engine>
  </Service>

  <!--新增的项目vue1-->
	<!--1、修改这里的name-->
  <Service name="Catalina_vue1">
	<!--2、设置port来规定新增项目的端口号-->
    <Connector port="8081" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" />
    <!--3、修改name的值要与第一步设置的值相同-->
    <Engine name="Catalina_vue1" defaultHost="localhost">
    
      <Realm className="org.apache.catalina.realm.LockOutRealm">
        
        <Realm className="org.apache.catalina.realm.UserDatabaseRealm"
               resourceName="UserDatabase"/>
      </Realm>
      <!--4、修改appBase为webapps_vue1-->
      <Host name="localhost"  appBase="webapps_vue1"
            unpackWARs="true" autoDeploy="true">

        <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
               prefix="localhost_access_log" suffix=".txt"
               pattern="%h %l %u %t &quot;%r&quot; %s %b" />
               
        <!--5、path指的是访问该项目url的虚拟目录部分-->
        <!--6、docBase指项目存放的路径-->
        <Context path="/" docBase="/usr/local/tomcat/apache-tomcat-7.0.67/webapps_vue1/dist" reloadable="true" />  

      </Host>
    </Engine>
  </Service>


</Server>
