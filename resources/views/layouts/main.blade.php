<!DOCTYPE html>
<html>
<head>
    <title>App Name - @yield('title')</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no"/>
    <link rel="stylesheet" href="{{ mix('/css/main.css') }}">
    <script src="{{ mix('/js/main.js') }}"></script>
</head>
<body>
@section('sidebar')
    This is the master sidebar.
@show

<div class="container">
    @yield('content')
</div>
</body>
</html>
