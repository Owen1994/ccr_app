<template>
    <div class="header">
        <ul class="clearfix">
            <li @click="$router.push(backRouth)">
                <span class="fa fa-chevron-left" style="color: red;"></span>
            </li>
            <li>
                <span>{{title}}</span>
            </li>
            <li @click="$router.push(extraRouth)">
                <span>{{ extraLabel }}</span>
            </li>
        </ul>
    </div>    
</template>
<script>
    export default {
        data() {
            return {
                
            }
        },
        props: ["title","backRouth","extraLabel","extraRouth"]
    }
</script>
<style>

</style>

