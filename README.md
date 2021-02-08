# getraenkekasse-mete-compat

Compatibility layer for getraenkekasse and mete.

Mete currently only supports v1 of the [space market api](https://space-market.github.io/API/preview/v1/).
This version only allows to link barcodes (ids) to products and not ids to users (which we need for nfc linking).

So this thing here provides a super simple thing to map these.

So in the end (if somebody adds v3 API support to mete) this service should simply die.
