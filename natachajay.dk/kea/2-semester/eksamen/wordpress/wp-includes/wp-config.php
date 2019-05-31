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
define( 'DB_NAME', 'maria_black' );

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
define( 'AUTH_KEY',         'xtQ nOVU)i+rWhF;{;(_;;%3ACgU4Fhx+Y(^k%Ssoxb(jK]_AR6fj4c)%Ys4?E&R' );
define( 'SECURE_AUTH_KEY',  '|BZ6GOxsm|NwBcNvOd]~R#{!~mPtsU[D-P!C~@:A^|[sO{|u^6kFYi+4d=>2L;<t' );
define( 'LOGGED_IN_KEY',    'bLQ >^8*gW(7s#b9vr7E*JmY`3sQK$),I-ZpfGFjlt7=d^4m8^MyJX #</o>)lar' );
define( 'NONCE_KEY',        'FD.`J+wEvl5NKacA!Zt=ON1giZR!XtRFi#5{wvNTIBSg:=hHuJ4@`;Q/WEY2~))q' );
define( 'AUTH_SALT',        'Mo%WlD]*mVYT2/MliARt=<b9{z<0|A`UV;q5-AHR]{O`:-~V$osGAwqd;^//!9/z' );
define( 'SECURE_AUTH_SALT', 'wG li 13Rt>w<0Wu`oMU:53Q!F]v{}U[%HA`5}D4HX1iuUAMW_usNBo5iSuS;xG.' );
define( 'LOGGED_IN_SALT',   'J:1orU&Zx[O0{yqrUEiMxwxf-8B~nBs|20BKO.Uq>PrbrFE!|uuBf:.GBBVuk$Le' );
define( 'NONCE_SALT',       '}HnxoY/cuy/~:x1e$gBCxV;fu5;dq`Bd7Hy&=M7+O]Nvi+7SaAxuitel1Rd6/C&@' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_maria_black';

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
