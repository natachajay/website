<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'xrdb' );

/** MySQL database username */
define( 'DB_USER', 'natacha' );

/** MySQL database password */
define( 'DB_PASSWORD', 'yankis2700' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '+gV=L*sM[YPSr_0F?(9s52~Z@b2P( wzw$eg^~#~>!:A1j<B!:7U5s/1GhGj#+!R' );
define( 'SECURE_AUTH_KEY',  'g%weIt#yj=?@3 f.h}L}A&Vt%QBIq}c{ke>0df>>GIoe)hi[aF=Z;}W!JfV;]N7c' );
define( 'LOGGED_IN_KEY',    'j3cux>(f5*Ky}h.bzjV,f2ds`9~O+e9BONAG)0Y}<U63,,C$DFES)Ltf&t.7AK8g' );
define( 'NONCE_KEY',        '`m=zNmK1ft0f2&NP:j u+h-<kqN^d~vQ7B,!r+v]0U1@|.tLF:N:Ue(V1HW64wla' );
define( 'AUTH_SALT',        'Xg7V1:)+]?wkH?NIEU<l9+;6gzfwgoB3BEhB8zipn[In{{jN&6<VY^EL 5YlsB/Z' );
define( 'SECURE_AUTH_SALT', 'R#DGJ*!0-GZU5EG1Z7s.@7y[]Hbe)hN9gINm+795/:X1Xr]5k_Yc`YVqh`<R!P{O' );
define( 'LOGGED_IN_SALT',   'bwcNl>Zb6d(,(h>Y7Qrw`RoG-}}#qGi8#HC-+l6CGo0$C;X#>w))5<JW=Jpk*0r{' );
define( 'NONCE_SALT',       'BH&HtOC`fK;@p*1Z-&JeWl/EkRFW6=(9pQ1jWJUn#[LG7n?(y9g]6G!;sp_{N>7X' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_xrdb';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );
