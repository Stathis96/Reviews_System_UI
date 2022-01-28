<template>
    <div class="event-card profile-tab" @click="reviewDialogRef.editReview(review)">
        <q-btn icon="clear" color="red" class="float-right" @click.stop="deleteDialogRef.openDialog(review.id)"></q-btn>
        <p class="text-h4 text-center font">Intern's Review #{{index+1}}</p>
        <div class="row">
            <div class="col-md-6">
                <label>Review id </label>
            </div>
            <div class="col-md-6">
                <p>{{review?.id}}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <label>Initiative </label>
            </div>
            <div class="col-md-6">
                <p>{{review?.initiative}}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <label>Cooperation </label>
            </div>
            <div class="col-md-6">
                <p>{{review?.cooperation}}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <label>Performance </label>
            </div>
            <div class="col-md-6">
                <p>{{review?.performance}}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <label>Total </label>
            </div>
            <div class="col-md-6">
                <p>{{review?.total}}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <label>Review At </label>
            </div>
            <div class="col-md-6">
                <p>{{moment(review?.createdAt).format('MMMM Do YYYY')}}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <label>Review By </label>
            </div>
            <div class="col-md-6">
                <p>{{review?.supervisor.name}}</p>
            </div>
        </div>
    </div>
<ReviewDialog ref="reviewDialogRef" @refetchreviews="refetchreviews"/>
<DeleteDialog ref="deleteDialogRef"
:typeOfProp="'Review'"
@refetching="refetchreviews"/>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import moment from 'moment'

import Review from '../interfaces/Review'

import ReviewDialog from '../components/ReviewDialog.vue'
import DeleteDialog from '../components/DeleteDialog.vue'

export default defineComponent({
  name: 'ReviewItem',
  emits: ['refetchreviews'],
  components: {
    ReviewDialog,
    DeleteDialog
  },
  props: {
    review: {
      type: Object as PropType<Review>,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  setup (_, { emit }) {
    const reviewDialogRef = ref(null)
    const deleteDialogRef = ref(null)
    const editReview = (id : string) => {
      console.log('i sent the following id: ', id)
    }
    const refetchreviews = () => {
      emit('refetchreviews')
    }
    return {
      moment,
      reviewDialogRef,
      deleteDialogRef,
      editReview,
      refetchreviews
    }
  }
})
</script>

<style lang="scss" scoped>
.event-card {
  padding: 10px;
  margin: 10px;
  cursor: pointer;
  border: 1px solid #39495c;
}

.profile-tab label{
    font-weight: 600;
}
.profile-tab p{
    font-weight: 600;
    color: #0062cc;
}
@import url('https://fonts.googleapis.com/css2?family=Italianno&display=swap');
.font {
    font-family: 'Italianno', cursive;
}
</style>
