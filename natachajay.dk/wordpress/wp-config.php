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
define( 'DB_NAME', 'portfolio' );

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
define( 'AUTH_KEY',         'e,KViTfUi(NLL2c7#YcLheF_b>Z.PUn<Y$48e&W.%-ndj9mxb{*{S[zXRkQ!uQ!&' );
define( 'SECURE_AUTH_KEY',  'adrIP~|;Ob7E`TcB8nfUW>N}dS]/vyL ,3^_z+g&Jo/BXb=%uo0(ZY;li:5debmo' );
define( 'LOGGED_IN_KEY',    'RaFSrjg,l`dh=X/B3FM3+[kA/R&/r9TVT4}w(l%5U+weLu4v4_pinQs.5l,Qui}?' );
define( 'NONCE_KEY',        '&Pe&ekt.4/3}s-Fqgo>VEGKONS?c$/To9EOfbxy&`cO>9$V>m?9(Wh{zJM+X8zk#' );
define( 'AUTH_SALT',        'VcP~#`_7fk}O(&?w!T:r@m5*r_TlTi?AqUrs&dqmO9mxX}<,|e)He]W/[qX~bam&' );
define( 'SECURE_AUTH_SALT', 'd>$0ss iwmV_}&z^8tx!WeTECxL)$`~FFzUoYG5_PKJGc%v)=+6O}vMy=@`:,&y3' );
define( 'LOGGED_IN_SALT',   'Eb6k3{E&]?}L<=Gq+-*e:]gd]wbItpbX-R$sy^}-h`?AQJ^)gruFpaTdxpGww.Dk' );
define( 'NONCE_SALT',       '}rtD$*BbgK](F7AJe,5 REc Wu@1zBYd$HmY).L58r+YjA5^IY~HHB,4A<3+^yzU' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_portfolio';

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
