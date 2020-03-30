@echo off

cd %~dp0

certutil -addstore -enterprise Root localhost.crt

