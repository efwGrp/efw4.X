param (
    [string]$Version
)
Write-Host "The version from pom.xml is: $Version"

$prj = "efw5x"
$ver = $Version

cd .\target
copy-item ../pom_for_maven_upload.xml efw-$ver.pom

gpg -ab efw-$ver.pom
gpg -ab efw-$ver-javadoc.jar
gpg -ab efw-$ver.jar
gpg -ab efw-$ver-sources.jar

(Get-FileHash -Algorithm MD5 efw-$ver.pom).Hash | Out-File -FilePath efw-$ver.pom.md5 -Encoding Ascii
(Get-FileHash -Algorithm MD5 efw-$ver-javadoc.jar).Hash | Out-File -FilePath efw-$ver-javadoc.jar.md5 -Encoding Ascii
(Get-FileHash -Algorithm MD5 efw-$ver.jar).Hash | Out-File -FilePath efw-$ver.jar.md5 -Encoding Ascii
(Get-FileHash -Algorithm MD5 efw-$ver-sources.jar).Hash | Out-File -FilePath efw-$ver-sources.jar.md5 -Encoding Ascii

(Get-FileHash -Algorithm SHA1 efw-$ver.pom).Hash | Out-File -FilePath efw-$ver.pom.sha1 -Encoding Ascii
(Get-FileHash -Algorithm SHA1 efw-$ver-javadoc.jar).Hash | Out-File -FilePath efw-$ver-javadoc.jar.sha1 -Encoding Ascii
(Get-FileHash -Algorithm SHA1 efw-$ver.jar).Hash | Out-File -FilePath efw-$ver.jar.sha1 -Encoding Ascii
(Get-FileHash -Algorithm SHA1 efw-$ver-sources.jar).Hash | Out-File -FilePath efw-$ver-sources.jar.sha1 -Encoding Ascii

md io\github\efwgrp\efw\$ver
move-item efw-$ver*.* io\github\efwgrp\efw\$ver\
Compress-Archive io io.zip
remove-item io -Force -Recurse
