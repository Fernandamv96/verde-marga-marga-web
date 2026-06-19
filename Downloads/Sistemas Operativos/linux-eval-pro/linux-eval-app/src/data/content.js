// src/data/content.js – Toda la data de la evaluación Linux

export const serviciosData = {
  dhcp: {
    label: 'DHCP',
    color: 'cyan',
    descripcion: 'Asigna IPs automáticamente a clientes en la red interna.',
    install: 'sudo apt install isc-dhcp-server -y',
    config: `# /etc/dhcp/dhcpd.conf
subnet 192.168.1.0 netmask 255.255.255.0 {
  range 192.168.1.100 192.168.1.200;
  option routers 192.168.1.1;
  option domain-name-servers 192.168.1.1;
  option domain-name "evallinux.local";
  default-lease-time 600;
  max-lease-time 7200;
}`,
    interfaz: `# /etc/default/isc-dhcp-server
INTERFACESv4="enp0s3"`,
    restart: 'sudo systemctl restart isc-dhcp-server\nsudo systemctl enable isc-dhcp-server\nsudo systemctl status isc-dhcp-server',
  },

  dns: {
    label: 'DNS',
    color: 'violet',
    descripcion: 'Resuelve nombres de dominio a direcciones IP dentro de la red.',
    install: 'sudo apt install bind9 bind9utils -y',
    named: `# /etc/bind/named.conf.local
zone "evallinux.local" {
  type master;
  file "/etc/bind/db.evallinux.local";
};

zone "1.168.192.in-addr.arpa" {
  type master;
  file "/etc/bind/db.192.168.1";
};`,
    zonaDirecta: `; /etc/bind/db.evallinux.local
$TTL    604800
@       IN      SOA     server.evallinux.local. root.evallinux.local. (
                         2024010101 ; Serial
                         604800     ; Refresh
                         86400      ; Retry
                         2419200    ; Expire
                         604800 )   ; Negative Cache TTL
;
@       IN      NS      server.evallinux.local.
server  IN      A       192.168.1.1
www     IN      A       192.168.1.1`,
    restart: 'sudo systemctl restart bind9\nsudo systemctl enable bind9\n# Verificar:\nnslookup server.evallinux.local 192.168.1.1',
  },

  web: {
    label: 'Apache Web',
    color: 'emerald',
    descripcion: 'Servidor web que muestra páginas HTTP a los clientes.',
    install: 'sudo apt install apache2 -y',
    html: `<!-- /var/www/html/index.html -->
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Servidor Linux PRO</title>
  <style>
    body { font-family: Arial; background: #0a0f1e;
           color: #00d4ff; text-align: center; padding: 50px; }
    h1 { font-size: 2.5rem; }
    .badge { background: #7c3aed; color: white;
             padding: 8px 20px; border-radius: 20px; }
  </style>
</head>
<body>
  <h1>🐧 Servidor Linux PRO</h1>
  <p>Evaluación Linux Server – En línea</p>
  <span class="badge">Apache2 funcionando ✓</span>
</body>
</html>`,
    restart: 'sudo systemctl restart apache2\nsudo systemctl enable apache2\n# Verificar en Windows:\n# http://192.168.1.1',
  },
};

export const usuariosData = [
  { usuario: 'admin1',   grupo: 'VENTAS',   uid: '1001', shell: '/bin/bash',  descripcion: 'Administrador de ventas' },
  { usuario: 'admin2',   grupo: 'VENTAS',   uid: '1002', shell: '/bin/bash',  descripcion: 'Soporte ventas' },
  { usuario: 'prueba3',  grupo: 'SOPORTE',  uid: '1003', shell: '/bin/bash',  descripcion: 'Técnico soporte' },
  { usuario: 'prueba4',  grupo: 'SOPORTE',  uid: '1004', shell: '/bin/bash',  descripcion: 'Técnico soporte 2' },
];

export const gruposData = [
  { grupo: 'VENTAS',  gid: '2001', miembros: ['admin1', 'admin2'],  color: 'cyan' },
  { grupo: 'SOPORTE', gid: '2002', miembros: ['prueba3', 'prueba4'], color: 'violet' },
];

export const comandosUsuarios = `# ── Crear grupos ──────────────────────────
sudo groupadd VENTAS
sudo groupadd SOPORTE

# ── Crear usuarios ─────────────────────────
sudo useradd -m -s /bin/bash -G VENTAS  admin1
sudo useradd -m -s /bin/bash -G VENTAS  admin2
sudo useradd -m -s /bin/bash -G SOPORTE prueba3
sudo useradd -m -s /bin/bash -G SOPORTE prueba4

# ── Establecer contraseñas ─────────────────
sudo passwd admin1   # → 1234 (o la indicada)
sudo passwd admin2
sudo passwd prueba3
sudo passwd prueba4

# ── Verificar ─────────────────────────────
id admin1
getent group VENTAS`;

export const permisosData = [
  {
    octal: '777',
    simbolico: 'rwxrwxrwx',
    desc: 'Acceso total para todos',
    owner: 'rwx', group: 'rwx', others: 'rwx',
    color: 'red',
    ejemplo: 'chmod 777 /srv/compartido',
    warning: true,
  },
  {
    octal: '770',
    simbolico: 'rwxrwx---',
    desc: 'Owner y grupo: acceso total. Otros: ninguno',
    owner: 'rwx', group: 'rwx', others: '---',
    color: 'yellow',
    ejemplo: 'chmod 770 /srv/proyectos',
    warning: false,
  },
  {
    octal: '700',
    simbolico: 'rwx------',
    desc: 'Solo el propietario tiene acceso total',
    owner: 'rwx', group: '---', others: '---',
    color: 'green',
    ejemplo: 'chmod 700 /home/prueba3/privado',
    warning: false,
  },
  {
    octal: '755',
    simbolico: 'rwxr-xr-x',
    desc: 'Owner: total. Grupo y otros: leer + ejecutar',
    owner: 'rwx', group: 'r-x', others: 'r-x',
    color: 'blue',
    ejemplo: 'chmod 755 /var/www/html',
    warning: false,
  },
];

export const comandosPermisos = `# ── Crear directorios del proyecto ───────────
sudo mkdir -p /srv/proyectos
sudo mkdir -p /home/prueba3/privado

# ── Asignar propietarios ───────────────────
sudo chown admin1:VENTAS  /srv/proyectos
sudo chown prueba3:SOPORTE /home/prueba3/privado

# ── Asignar permisos ──────────────────────
sudo chmod 770 /srv/proyectos      # VENTAS puede, otros no
sudo chmod 700 /home/prueba3/privado  # solo prueba3

# ── Verificar ─────────────────────────────
ls -la /srv/
ls -la /home/prueba3/`;

export const checklistPruebas = [
  {
    categoria: 'DHCP',
    color: 'cyan',
    pruebas: [
      { id: 'dhcp1', label: 'Windows recibe IP automática de la red 192.168.1.x', cmd: 'ipconfig /all' },
      { id: 'dhcp2', label: 'La IP asignada está en el rango 192.168.1.100-200', cmd: null },
      { id: 'dhcp3', label: 'El gateway predeterminado es 192.168.1.1', cmd: null },
    ],
  },
  {
    categoria: 'DNS',
    color: 'violet',
    pruebas: [
      { id: 'dns1', label: 'nslookup server.evallinux.local resuelve correctamente', cmd: 'nslookup server.evallinux.local' },
      { id: 'dns2', label: 'ping server.evallinux.local funciona desde Windows', cmd: 'ping server.evallinux.local' },
    ],
  },
  {
    categoria: 'Apache Web',
    color: 'emerald',
    pruebas: [
      { id: 'web1', label: 'http://192.168.1.1 muestra la página desde Windows', cmd: null },
      { id: 'web2', label: 'http://www.evallinux.local carga la página (si DNS ok)', cmd: null },
    ],
  },
  {
    categoria: 'Usuarios y Grupos',
    color: 'yellow',
    pruebas: [
      { id: 'usr1', label: 'admin1 existe y pertenece a VENTAS', cmd: 'id admin1' },
      { id: 'usr2', label: 'prueba3 existe y pertenece a SOPORTE', cmd: 'id prueba3' },
      { id: 'usr3', label: 'Grupos VENTAS y SOPORTE creados', cmd: 'getent group VENTAS SOPORTE' },
    ],
  },
  {
    categoria: 'Permisos',
    color: 'orange',
    pruebas: [
      { id: 'perm1', label: 'drwxrwx--- en /srv/proyectos (propietario admin1:VENTAS)', cmd: 'ls -la /srv/' },
      { id: 'perm2', label: 'drwx------ en /home/prueba3/privado (propietario prueba3:SOPORTE)', cmd: 'ls -la /home/prueba3/' },
    ],
  },
];

export const capturas = [
  { id: 1, titulo: 'Configuración de red VirtualBox',       desc: 'Mostrar adaptadores de red de la VM Linux (NAT + Red Interna)', cuando: 'Al crear la VM', icono: '🌐' },
  { id: 2, titulo: 'Instalación Ubuntu – Particiones',       desc: 'Pantalla de particionado durante la instalación (/ y swap)', cuando: 'Durante instalación', icono: '💽' },
  { id: 3, titulo: 'ifconfig / ip a en Linux',               desc: 'IP del servidor Linux en la red interna (192.168.1.1)', cuando: 'Post-instalación', icono: '🔌' },
  { id: 4, titulo: 'Estado del servicio DHCP',               desc: 'systemctl status isc-dhcp-server mostrando "active (running)"', cuando: 'Tras instalar DHCP', icono: '📡' },
  { id: 5, titulo: 'ipconfig /all en Windows',               desc: 'IP automática recibida en Windows cliente (192.168.1.xxx)', cuando: 'Prueba DHCP', icono: '💻' },
  { id: 6, titulo: 'nslookup desde Windows',                 desc: 'Resolución de server.evallinux.local hacia 192.168.1.1', cuando: 'Prueba DNS', icono: '🔍' },
  { id: 7, titulo: 'Navegador Windows – Web Apache',         desc: 'http://192.168.1.1 mostrando la página del servidor', cuando: 'Prueba Apache', icono: '🌍' },
  { id: 8, titulo: 'ls -la /srv/ y /home/',                  desc: 'Permisos y propietarios correctos de los directorios', cuando: 'Verificación permisos', icono: '📁' },
  { id: 9, titulo: 'id admin1 y id prueba3',                 desc: 'Verificación de usuarios y grupos en terminal', cuando: 'Verificación usuarios', icono: '👤' },
  { id:10, titulo: 'Resultado final ls -la',                 desc: 'drwxrwxrwx admin1 VENTAS proyectos / drwx------ prueba3 SOPORTE privado', cuando: 'Verificación final', icono: '✅' },
];
