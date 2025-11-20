# MARIO3 TUTORIAL

Requirements

Java version 1.8

Maven version

## Run mario

### Install lib

STEP 1

Use mvn to install lib

mvn install

nhb-common

nhb-common-db

nhb-common-encrypt

nhb-common-messagin

STEP 2

Do framework đối tác gửi còn thiếu một số lib nên sẽ tự cài đặt riêng

deadlockmonitor-1.0.0.jar

uncommons-maths-1.2.3.jar

mvn install:install-file \
-Dfile=./deadlockmonitor-1.0.0.jar \
-DgroupId=com.nhb \
-DartifactId=deadlockmonitor \
-Dversion=1.0.0 \
-Dpackaging=jar

mvn install:install-file \
-Dfile=./uncommons-maths-1.2.3.jar \
-DgroupId=com.uncommons \
-DartifactId=uncommons-maths \
-Dversion=1.2.3 \
-Dpackaging=jar

STEP 3

Mở pom.xml của mario3 chỉnh lại cho đúng version

### Run mario3

Trong Intellij, chọn Run / Debug Configurations > Edit Configurations... > Application > Add New Configuration > Application
- Name : run mario3
- Build and run : java 8; mario3
- Main Class: com.mario.Mario


## Create extension

### Create project

Tạo maven project "game-server-sicbo"

Java version 1.8

### Create extension.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<mario>

	<name>MercuryGameServer</name>

	<external>

	</external>

	<datasources>

	</datasources>

	<servers>

	</servers>

	<producers>
		
	</producers>

	<gateways>
		<socket>
			<name>mercury_websocket_gateway</name>
			<protocol>WEBSOCKET</protocol>
			<port>8892</port>
			<workerpool>
				<poolsize>64</poolsize>
				<ringbuffersize>1048576</ringbuffersize>
				<threadnamepattern>Mercury I/O WS Worker #%d</threadnamepattern>
			</workerpool>
		</socket>
	</gateways>

	<lifecycles>
		<handler>
			<name>game-server-handler</name>
			<handle>net.binarix.tech.GameServerSicbo</handle>
			<bind>
				<gateway>mercury_websocket_gateway</gateway>
			</bind>
			<variables>
				<variable name="idle" type="integer">30</variable>
				<variable name="MGSConfiguration" type="string">minigame_config_configuration</variable>
			</variables>
		</handler>
	</lifecycles>
</mario>
```

### Config pom

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>module</groupId>
        <artifactId>parent-module</artifactId>
        <version>1.0.0</version>
    </parent>

    <groupId>net.binarix.tech</groupId>
    <artifactId>game-server-sicbo</artifactId>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>
        <dependency>
            <groupId>com.mario</groupId>
            <artifactId>mario3</artifactId>
            <version>1.0.0</version>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.3</version>
                <configuration>
                    <source>1.8</source>
                    <target>1.8</target>
                </configuration>
            </plugin>

            <plugin>
                <artifactId>maven-antrun-plugin</artifactId>
                <version>1.8</version>
                <executions>
                    <execution>
                        <id>pack</id>
                        <phase>prepare-package</phase>
                        <configuration>
                            <target>
                                <delete failonerror="false">
                                    <fileset dir="${project.build.directory}/${extension.name}" />
                                </delete>
                                <mkdir dir="${project.build.directory}/${extension.name}" />
                                <mkdir dir="${project.build.directory}/${extension.name}/conf" />
                                <mkdir dir="${project.build.directory}/${extension.name}/lib" />
                                <mkdir dir="${project.build.directory}/${extension.name}/plugins" />

                                <copy todir="${project.build.directory}/${extension.name}" failonerror="false">
                                    <fileset file="${project.basedir}/extension*.xml" />
                                </copy>
                                <copy todir="${project.build.directory}/${extension.name}/conf" failonerror="false">
                                    <fileset dir="${project.basedir}/conf" />
                                </copy>
                                <copy todir="${project.build.directory}/${extension.name}/plugins" failonerror="false">
                                    <fileset dir="${project.basedir}/plugins" />
                                </copy>
                            </target>
                        </configuration>
                        <goals>
                            <goal>run</goal>
                        </goals>
                    </execution>

                    <execution>
                        <id>deploy</id>
                        <phase>install</phase>
                        <configuration>
                            <target>
                                <echo message="***************copy from ${project.build.directory} to ${project.build.directory}/${extension.name}/lib"></echo>

                                <copy todir="${project.build.directory}/${extension.name}/lib">
                                    <fileset dir="${project.build.directory}">
                                        <include name="${project.artifactId}-${project.version}.jar" />
                                    </fileset>
                                </copy>

                                <zip destfile="${project.build.directory}/${extension.name}-${project.version}.zip" basedir="${project.build.directory}/${extension.name}" />

                            </target>
                        </configuration>
                        <goals>
                            <goal>run</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>

            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-dependency-plugin</artifactId>
                <version>2.8</version>
                <executions>
                    <execution>
                        <id>copy-dependencies</id>
                        <phase>package</phase>
                        <goals>
                            <goal>copy-dependencies</goal>
                        </goals>
                        <configuration>
                            <outputDirectory>${project.build.directory}/${extension.name}/lib</outputDirectory>
                            <overWriteReleases>true</overWriteReleases>
                            <overWriteSnapshots>false</overWriteSnapshots>
                            <overWriteIfNewer>true</overWriteIfNewer>
                            <excludeScope>provided</excludeScope>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
</project>
```


### Create net.binarix.tech.GameServerSicbo

```java
public class GameServerSicbo extends BaseMessageHandler {
    @Override
    public void init(PuObjectRO initParams) {
        this.super(initParams);
    }

    @Override
    public PuElement handle(Message message) {
        SocketMessage socketMessage = (SocketMessage) message;
        String sessionId = socketMessage.getSessionId();
        System.out.println("Session ID: " + sessionId);
        SocketMessageType socketMessageType = socketMessage.getSocketMessageType();
        System.out.println("Socket Message Type: " + socketMessageType);
        return null;
    }
}
```

### deploy

mvn clean deploy

copy target/game-server-sicbo > Mario/extensions
